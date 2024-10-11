require("dotenv").config();

import TonWeb from "tonweb";
import { validateMnemonic, mnemonicToSeed } from "tonweb-mnemonic";
import { sampleSize } from 'lodash';
import * as Joi from 'joi';
import mongoose from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';

const seedPhrase = process.env.SEED_PHRASE;
if (!seedPhrase) {
  console.error(`
    🚨🚨🚨 [ERROR] SEED_PHRASE Missing! 🚨🚨🚨
    It looks like you forgot to add the SEED_PHRASE to your .env file.
    Please create a .env file in the root directory and add the following line:
    
    SEED_PHRASE="your seed phrase here"
    
    After that, try running the script again. Good luck!
    `);
  process.exit(1);
}

const words = seedPhrase.split(" ");

const initTelegramWallet = () => {
    const isValid = validateMnemonic(words);
    if (!isValid) {
      throw new Error("Invalid seed phrase");
    }

    const seed = await mnemonicToSeed(words);

    const tonweb = new TonWeb(
      new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
        apiKey:
          "1cab7ad6db873349267be5dee22476afb42c3623a5c3ada3dcbacb6213d3cc4f",
      })
    );

    const keyPair = TonWeb.utils.keyPairFromSeed(seed);

    const getWalletAddress = async (WalletClass, version) => {
      const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
      });
      const address = await wallet.getAddress();
      let newAddress = address.toString({ bounceable: true });
      newAddress = newAddress.replace(/\+/g, "-").replace(/\//g, "_");
      console.log(`Wallet Address (${version}):`, newAddress);
    };

    console.log("Public Key:", TonWeb.utils.bytesToHex(keyPair.publicKey));
    console.log("Private Key:", TonWeb.utils.bytesToHex(keyPair.secretKey));
}

interface TournamentConfig {
  title: string;
  description: string;
  image_url: string;
  entry_price: number;
  round_duration_in_seconds: number;
  start_timestamp: number;
  rounds: number;
  static_prize_pool?: number;
  isTonConnected?: boolean;
}

@Command({
  name: 'create-tournament',
  arguments: '<database-url> <path>',
})
export class CreateTournamentCommand extends CommandRunner {
  private readonly SECONDS_IN_HOUR = 3600;
  private readonly MAX_TOKENS_PER_OFFER = 6;

  private readonly TOURNAMENT_COLLECTION_NAME = 'tournaments';
  private readonly OFFER_COLLECTION_NAME = 'tokens_offers';

  private readonly CONFIG_VALIDATION_SCHEMA = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image_url: Joi.string().required(),
    rounds: Joi.number().required(),
    entry_price: Joi.number().required(),
    round_duration_in_seconds: Joi.number().required().min(3600),
    start_timestamp: Joi.number().required(),
    static_prize_pool: Joi.number().optional(),
  });

  public async run(inputs: string[]) {
    const [databaseUrl, path] = inputs;

    const config = this.readConfig(path);

    this.validateConfig(config);

    const startTimestamp = Math.floor(config.start_timestamp / this.SECONDS_IN_HOUR) * this.SECONDS_IN_HOUR;

    const databaseConnection = await mongoose.connect(databaseUrl);
    const session = await databaseConnection.startSession();

    try {
      await session.withTransaction(async () => {
        const insertionResult = await databaseConnection.connection.collection(this.TOURNAMENT_COLLECTION_NAME).insertOne({
          title: config.title,
          description: config.description,
          imageUrl: config.image_url,
          entryPrice: config.entry_price,
          staticPrizePool: config.static_prize_pool || 0,
          participantsCount: 0,
          startTimestamp: startTimestamp,
          endTimestamp: startTimestamp + ((config.rounds + 1) * config.round_duration_in_seconds),
          roundDurationInSeconds: config.round_duration_in_seconds,
          isTonConnected: config.isTonConnected
          __v: 0,
        }, {
          session,
        });

        const tokenOffers = new Array(config.rounds).fill(null).map((key, round) => {
          const timestamp = startTimestamp + ((round + 1) * config.round_duration_in_seconds);

          return {
            timestamp,
            tokens: sampleSize(this.AVAILABLE_TOKENS, this.MAX_TOKENS_PER_OFFER),
            opensAfterTimestamp: timestamp - config.round_duration_in_seconds,
            durationInSeconds: config.round_duration_in_seconds,
            tournament: insertionResult.insertedId,
            __v: 0,
          };
        });

        await databaseConnection.connection.collection(this.OFFER_COLLECTION_NAME).insertMany(tokenOffers, {
          session,
        });
      });
    } finally {
      await session.endSession();
      await databaseConnection.disconnect();
    }
  }

  private readConfig(path: string) {
    const file = fs.readFileSync(path);

    return JSON.parse(file.toString());
  }

  private validateConfig(config: unknown): asserts config is TournamentConfig {
    const validationResult = this.CONFIG_VALIDATION_SCHEMA.validate(config);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

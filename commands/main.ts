import { CommandFactory } from 'nest-commander';
import { Module } from '@nestjs/common';
import { SendRewardCommand } from './reward-ton-tournament.command';

@Module({
  providers: [SendRewardCommand],
})
export class AppModule {}

async function bootstrap() {
  await CommandFactory.run(AppModule);
}

bootstrap();

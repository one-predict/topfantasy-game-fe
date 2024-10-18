import clsx from 'clsx';
import Typography, { TypographyVariant, TypographyTag } from '@components/Typography';
import styles from './CryptoCoinsDisplay.module.scss';

export type CryptoCurrencyToDisplay = 'ton';

export interface CryptoCoinsDisplayProps {
  coins: number;
  currency: CryptoCurrencyToDisplay;
  variant?: TypographyVariant;
  tag?: TypographyTag;
  dark?: boolean;
}

const currencyToImageSrc: Record<CryptoCurrencyToDisplay, string> = {
  ton: '/images/ton-token.png',
};

const CryptoCoinsDisplay = ({ coins, currency, className, variant, tag, dark }: CryptoCoinsDisplayProps) => {
  return (
    <Typography
      color={dark ? 'black' : 'primary'}
      variant={variant}
      className={clsx(styles.cryptoCoinsDisplay, className)}
      tag={tag}
    >
      <img className={styles.cryptoCurrencyImage} alt="crypto-currency-image" src={currencyToImageSrc[currency]} />
      <span>{coins}</span>
    </Typography>
  );
};

export default CryptoCoinsDisplay;

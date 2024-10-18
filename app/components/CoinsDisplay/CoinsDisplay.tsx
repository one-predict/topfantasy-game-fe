import clsx from 'clsx';
import Typography, { TypographyVariant, TypographyTag } from '@components/Typography';
import FantasyCoinIcon from '@assets/icons/fantasy-coin.svg?react';
import { humanizeNumber } from '@utils/formatting';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps {
  coins: number | undefined;
  dark?: boolean;
  humanize?: boolean;
  variant?: TypographyVariant;
  tag?: TypographyTag;
}

const CoinsDisplay = ({ coins, dark, humanize, className, variant, tag }: CoinsDisplayProps) => {
  const pointsToDisplay = humanize ? humanizeNumber(coins || 0) : coins;

  return (
    <Typography
      color={dark ? 'black' : 'primary'}
      variant={variant}
      className={clsx(styles.coinsDisplay, className)}
      tag={tag}
    >
      <FantasyCoinIcon className={clsx(styles.fantasyCoinIcon, dark && styles.darkFantasyCoinIcon)} />
      <span>{coins !== undefined ? `+${pointsToDisplay}` : <>—</>}</span>
    </Typography>
  );
};

export default CoinsDisplay;

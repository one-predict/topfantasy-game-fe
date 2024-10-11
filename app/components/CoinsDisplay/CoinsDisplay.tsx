import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import OurTokenImage from '@components/OurTokenImage';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
  postfix?: string;
  containerClassName?: string;
  tokenImageClassName?: string;
  tokenImageSrc?: string;
}

const CoinsDisplay = ({
  containerClassName,
  coins,
  postfix,
  tokenImageClassName,
  tokenImageSrc = '/images/token.png',
  ...typographyProps
}: CoinsDisplayProps) => {
  return (
    <div className={clsx(styles.coinsDisplay, containerClassName)}>
      <OurTokenImage className={clsx(styles.tokenImage, tokenImageClassName)} src={tokenImageSrc} />
      <Typography {...typographyProps}>
        {coins}
        {postfix ? ` ${postfix}` : ''}
      </Typography>
    </div>
  );
};

export default CoinsDisplay;

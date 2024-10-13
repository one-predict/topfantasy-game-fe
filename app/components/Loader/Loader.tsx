import clsx from 'clsx';
import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
  centered?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Loader = ({ className, size = 'medium', centered }: LoaderProps) => {
  const loaderComposedClassName = clsx(
    styles.loader,
    {
      [styles.smallLoader]: size === 'small',
      [styles.mediumLoader]: size === 'medium',
      [styles.largeLoader]: size === 'large',
      [styles.centeredLoader]: centered,
    },
    className,
  );

  return <div className={loaderComposedClassName} />;
};

export default Loader;

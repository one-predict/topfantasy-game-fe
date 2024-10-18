import millify from 'millify';
const LEADING_ZERO_NUMBER_THRESHOLD = 10;

export const formatWithLeadingZero = (value: number) => {
  return value < LEADING_ZERO_NUMBER_THRESHOLD ? `0${value}` : value.toString();
};

export const humanizeNumber = (value: number) => {
  return millify(value);
};

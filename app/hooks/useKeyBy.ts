import { useMemo } from 'react';
import _ from 'lodash';

const useKeyBy = <Item>(array: Item[], keyOrCallback: keyof Item | string | ((item: Item) => string)) => {
  return useMemo(() => {
    return _.keyBy(array, keyOrCallback);
  }, [array, keyOrCallback]);
};

export default useKeyBy;

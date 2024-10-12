import {useMemo} from "react";
import _ from "lodash";

const useSumBy = <Item>(array: Item[], keyOrCallback: keyof Item | string | ((item: Item) => number)) => {
  return useMemo(() => {
    return _.sumBy(array, keyOrCallback);
  }, [array, keyOrCallback]);
};

export default useSumBy;

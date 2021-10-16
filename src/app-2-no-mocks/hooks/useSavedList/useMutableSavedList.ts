import { useState } from "react";

export const useMutableSavedList = <T extends unknown, ID>(
  data: T[] = [],
  getId: (itemData: T) => ID
) => {
  const [savedData, setSavedData] = useState<T[]>(data);
  const isSaved = (data: T) => savedData.some((d) => getId(d) === getId(data));
  const removeSavedItem = (data: T) =>
    setSavedData((p) => p.filter((d) => getId(d) !== getId(data)));
  const addSavedItem = (data: T) => setSavedData((p) => [...p, data]);
  const toggleSavedItem = (data: T) =>
    isSaved(data) ? removeSavedItem(data) : addSavedItem(data);
  return [
    savedData,
    { isSaved, removeSavedItem, addSavedItem, toggleSavedItem },
  ] as const;
};

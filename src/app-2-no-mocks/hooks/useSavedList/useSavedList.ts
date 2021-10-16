export const isSaved =
  <T, ID>(savedData: T[], getId: (itemData: T) => ID) =>
  (data: T) =>
    savedData.some((d) => getId(d) === getId(data));
export const removeSavedItem =
  <T, ID>(data: T, getId: (itemData: T) => ID) =>
  (p: T[]) =>
    p.filter((d) => getId(d) !== getId(data));
export const addSavedItem =
  <T>(data: T) =>
  (p: T[]) =>
    [...p, data];
export const toggleSavedItem = <T, ID>(
  savedData: T[],
  data: T,
  getId: (itemData: T) => ID
) =>
  isSaved(savedData, getId)(data)
    ? removeSavedItem(data, getId)(savedData)
    : addSavedItem(data)(savedData);

export const useSavedList = <T extends unknown, ID>(
  [savedData, setSavedData]: [T[], React.Dispatch<React.SetStateAction<T[]>>],
  getId: (itemData: T) => ID
) => {
  return [
    savedData,
    {
      isSaved: isSaved(savedData, getId),
      removeSavedItem: (d: T) => setSavedData(removeSavedItem(d, getId)),
      addSavedItem: (d: T) => setSavedData(addSavedItem(d)),
      toggleSavedItem: (d: T) => setSavedData(toggleSavedItem(savedData, d, getId)),
    },
  ] as const;
};

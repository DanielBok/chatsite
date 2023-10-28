export function orderedGroupBy<T, Key extends string | number | symbol>(array: readonly T[], getGroupId: (item: T) => Key) {
  const indexMap = {} as Record<Key, number>;

  return array.reduce((acc, element) => {
    const key = getGroupId(element);
    if (indexMap.hasOwnProperty(key)) {
      acc[indexMap[key]][1].push(element);
    } else {
      acc.push([key, [element]]);
      indexMap[key] = Object.keys(indexMap).length;
    }

    return acc;
  }, [] as [Key, T[]][]);
}
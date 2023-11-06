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

export function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}


export function range(start: number, stop?: number, step?: number) {
  const numbers: number[] = [];
  if (!stop) {
    stop = start;
    start = 0;
    step = 1;
  } else if (!step) {
    step = 1;
  }

  if (step === 0) {
    throw new Error("Step cannot be 0");
  } else if (start < stop && step < 0) {
    throw new Error("Invalid range, step must be greater than 0 if start < stop");
  } else if (start > stop && step > 0) {
    throw new Error("Invalid range, step must be less than 0 if start > stop");
  }

  for (let i = start; (step > 0 ? i < stop : i > stop); i += step) {
    numbers.push(i);
  }

  return numbers;
}

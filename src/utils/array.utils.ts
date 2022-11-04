const shuffle = (array: Array<number>) => {
  return array
    .map((arrayElement: number) => [arrayElement, Math.random()])
    .sort((randomNumber1: Array<number>, randomNumber2: Array<number>) =>
      randomNumber1[1] < randomNumber2[1] ? -1 : 1,
    )
    .map((arrayElement) => arrayElement[0]);
};

const randomSubset = function (array: Array<number>, numberOfSamples: number) {
  return shuffle(array).slice(0, numberOfSamples);
};

export { shuffle, randomSubset };

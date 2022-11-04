const sampleBoundedRandom = (u: number, l = 0) =>
  Math.ceil(Math.random() * (u - l) + l);

export { sampleBoundedRandom };

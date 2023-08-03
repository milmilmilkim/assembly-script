import microBenchmark from 'micro-benchmark';

const benchmark: (specs: { name: string; fn: () => any }[]) => {
  lastResult: any;
  name: string;
  ops: number;
  time: number;
}[] = (specs) => {
  const option = {
    duration: 100,
    maxOperations: 1000,
  };

  const result = microBenchmark.suite({
    ...option,
    specs,
  });

  return result;
};

export default benchmark;

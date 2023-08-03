import './tailwind.css';
import Calculator from './asc/Calculator.asc';
import * as TSCalculator from './ts/calculator';
import benchmark from './ts/benchmark';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

interface Calculator {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
  factorial: (num: number) => number;
  addWithLoopCount: (count: number, a: number, b: number) => void;
  subtractWithLoopCount: (count: number, a: number, b: number) => void;
  multiplyWithLoopCount: (count: number, a: number, b: number) => void;
  divideWithLoopCount: (count: number, a: number, b: number) => void;
  factorialWithLoopCount: (count: number, num: number) => void;
}
const WASMCalculator: Calculator = new Calculator().exports;
const factorialNumber = 1000;
const factorialLoop = 10000;
const N = 1000000;

const wasm = benchmark([
  {
    name: 'add',
    fn: function () {
      for (let i = 0; i < N; i++) {
        WASMCalculator.add(10, 20);
      }
    },
  },
  {
    name: 'subtract',
    fn: function () {
      for (let i = 0; i < N; i++) {
        WASMCalculator.subtract(30, 10);
      }
    },
  },
  {
    name: 'multiply',
    fn: function () {
      for (let i = 0; i < N; i++) {
        WASMCalculator.multiply(5, 5);
      }
    },
  },
  {
    name: 'divide',
    fn: function () {
      for (let i = 0; i < N; i++) {
        WASMCalculator.divide(5, 5);
      }
    },
  },
  {
    name: 'factorial',
    fn: function () {
      for (let i = 0; i < factorialLoop; i++) {
        WASMCalculator.factorial(factorialNumber);
      }
    },
  },
]);

const ts = benchmark([
  {
    name: 'add',
    fn: function () {
      for (let i = 0; i < N; i++) {
        TSCalculator.add(10, 20);
      }
    },
  },
  {
    name: 'subtract',
    fn: function () {
      for (let i = 0; i < N; i++) {
        TSCalculator.subtract(30, 10);
      }
    },
  },
  {
    name: 'multiply',
    fn: function () {
      for (let i = 0; i < N; i++) {
        TSCalculator.multiply(5, 5);
      }
    },
  },
  {
    name: 'divide',
    fn: function () {
      for (let i = 0; i < N; i++) {
        TSCalculator.divide(5, 5);
      }
    },
  },
  {
    name: 'factorial',
    fn: function () {
      for (let i = 0; i < factorialLoop; i++) {
        TSCalculator.factorial(factorialNumber);
      }
    },
  },
]);

console.log(wasm);
console.log(ts);

const wasmData = wasm.map((val) => val.time);
const tsData = ts.map((val) => val.time);

const ctx = document.getElementById('myChart') as HTMLCanvasElement;

const data = {
  labels: ['add', 'subtract', 'multiply', 'divide', 'factorial'],
  datasets: [
    {
      label: 'assembly script',
      data: wasmData,
      borderWidth: 1,
    },
    {
      label: 'typescript (javascript)',
      data: tsData,
      borderWidth: 1,
    },
  ],
};

const chart = new Chart(ctx, {
  type: 'bar',
  data,
});

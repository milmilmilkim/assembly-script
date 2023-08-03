export function add(a: number, b: number) {
  return a + b;
}

export function subtract(a: number, b: number) {
  return a - b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  return a / b;
}

export function factorial(num: number) {
  let tmp = num;

  if (num < 0) {
    return -1;
  } else if (num === 0) {
    return 1;
  }

  while (num > 2) {
    tmp *= num;
    num -= 1;
  }

  return tmp;
}

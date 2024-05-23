// @ts-nocheck

export function debounce(fn: any, wait: number) {
  let timer: number;

  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    const context: any = this;

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

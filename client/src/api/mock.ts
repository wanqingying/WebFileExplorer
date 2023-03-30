export function mockAsync<T extends any>(data: T) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

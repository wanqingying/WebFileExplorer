export function uuid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function mockAsync<T = any>(data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

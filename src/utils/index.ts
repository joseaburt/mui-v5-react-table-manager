export function get<R = any>(object: any, path: string, defaultValue?: R): R {
  const keys = path.split('.');
  let result = object;

  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue as R;
    result = result[key as keyof object];
  }

  return result !== undefined ? result : defaultValue;
}

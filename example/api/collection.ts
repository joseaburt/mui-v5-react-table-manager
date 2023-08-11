export default class Collection<T> {
  public paginate(collection: T[], page: number, size: number): T[] {
    const totalItems = collection.length;
    const totalPages = Math.ceil(totalItems / size);
    if (page < 1 || page > totalPages) return [];
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, totalItems);
    return collection.slice(startIndex, endIndex);
  }

  public search(collection: T[], query: Record<string, string>): T[] {
    const keys = Object.keys(query);
    if (!keys.length) return collection;
    const response: T[] = [];
    for (const item of collection) {
      const itemObject = item as unknown as object;
      for (const key of keys) {
        if (key in itemObject) {
          const searchingValue = query[key];
          const givenValue = `${item[key as keyof T]}`;
          if (givenValue && givenValue.toLowerCase().startsWith(searchingValue.toLowerCase())) response.push(item);
        }
      }
    }
    return response;
  }

  public sort(collection: T[], sortQuery?: Record<string, string>): T[] {
    if (sortQuery && Object.keys(sortQuery).length) {
      const key = Object.keys(sortQuery)[0];
      const value = sortQuery[key];
      collection = collection.slice().sort((a, b) => {
        const propertyValueA = `${a[key as keyof T]}`;
        const propertyValueB = `${b[key as keyof T]}`;
        if (value === 'desc') return propertyValueA.localeCompare(propertyValueB);
        return propertyValueB.localeCompare(propertyValueA);
      });
    }
    return collection;
  }
}

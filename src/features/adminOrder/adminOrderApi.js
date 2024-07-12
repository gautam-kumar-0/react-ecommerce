export function fetchOrderByFilter(filter, sort, page) {
  return new Promise(async (resolve) => {
    let queryString = `?_page=${page}&_per_page=10&`;
    for (let type in filter) {
      if (filter[type]) {
        queryString += `${[type]}=${filter[type]}&`;
      }
    }
    if (sort.by) {
      const order = sort.order === "asc" ? "" : "-";
      queryString += `_sort=${order}${sort.by}`;
    }

    const response = await fetch(
      `http://localhost:4000/orders${queryString}`
    );

    const data = await response.json();

    resolve(data);
  });
}

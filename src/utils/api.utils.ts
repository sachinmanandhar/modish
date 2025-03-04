import { camelToSnakeCase } from ".";

export function queryBuilder(params: {
  [key: string]: string | number;
}): string {
  let query = "";
  if (Object.keys(params).length > 0) {
    query += "?";
  }
  for (const key of Object.keys(params)) {
    if (params[key]) {
      let value = params[key];
      // if (Array.isArray(value)) {
      //   query += value.join(',');
      // }
      console.log(JSON.stringify(params[key]));
      if (Array.isArray(params[key])) {
        query += `&${camelToSnakeCase(key)}=${JSON.stringify(params[key])}`;
      } else {
        query += `&${camelToSnakeCase(key)}=${params[key]}`;
      }
    }
  }
  return query;
}

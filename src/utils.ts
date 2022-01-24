export const getUrlParams = (url = "") => {
  const params: any = {};
  url
    .slice(1)
    .split("&")
    .forEach(el => {
      const [key, value] = el.split("=");
      params[key] = value;
    });
  return params;
};

export const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find(key => object[key] === value);
};

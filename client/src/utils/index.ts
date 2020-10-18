type Value = any;
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const isEmail = (value: Value): boolean => emailRegex.test(value);

export const isNumber = (value: Value): boolean =>
  typeof parseFloat(value) === 'number' && !isNaN(parseFloat(value)) && !isNaN(value);

export const isMinNumber = (value: Value, min: number): boolean => {
  return parseFloat(value.length) >= min;
};

export function isEmpty(val) {
  return val.trim().length  === 0;
}

export function isValidEmail(val) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
}
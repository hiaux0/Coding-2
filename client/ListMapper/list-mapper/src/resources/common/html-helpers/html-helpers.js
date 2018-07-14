export function $(string, isSelectAll) {
  if (isSelectAll) {
    return document.querySelectorAll(string);
  }
  return document.querySelector(`${string}`);
}


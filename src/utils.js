export function setLocalStorage(name, value, stringify = true) {
  if (stringify) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    localStorage.setItem(name, value);
  }
}

export function getLocalStorage(name, stringify = true) {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(name);
    try {
      if (stringify) {
        return JSON.parse(value);
      } else {
        return value;
      }
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}

// Set in localstorage
export const setInLocalStorage = (key, value) => {
  if (window !== undefined) localStorage.setItem(key, JSON.stringify(value));
};

// Remove in localstorage
export const removeInLocalStorage = (key) => {
  if (window !== undefined) localStorage.removeItem(key);
};

// Signout
export const signout = (next) => {
  removeInLocalStorage("user");
};

// Check if is user is authentificated
export const isAuth = () => {
  if (window !== undefined) {
    if (localStorage.getItem("user")) return true;
    else return false;
  }
};

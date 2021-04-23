import { SAVED_SEARCHES } from "../const";

function getSavedSearches() {
  if (localStorage.getItem(SAVED_SEARCHES)) {
    return JSON.parse(localStorage.getItem(SAVED_SEARCHES) || "");
  }

  return null;
}

export function setSavedSearches(token: any) {
  return localStorage.setItem(SAVED_SEARCHES, JSON.stringify(token));
}

export default getSavedSearches;

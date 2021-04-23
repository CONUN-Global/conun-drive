import { SAVED_SEARCHES } from "../const";

function getSavedSearches() {
  if (localStorage.getItem(SAVED_SEARCHES)) {
    return JSON.parse(localStorage.getItem(SAVED_SEARCHES) || "");
  }

  return null;
}

export function setSavedSearches(searches: any[]) {
  return localStorage.setItem(SAVED_SEARCHES, JSON.stringify(searches));
}

export default getSavedSearches;

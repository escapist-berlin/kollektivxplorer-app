function saveStoredReleaseIds(storedIds) {
  localStorage.setItem('storedReleaseIds', JSON.stringify(storedIds));
}

export function getStoredReleaseIds() {
  return JSON.parse(localStorage.getItem('storedReleaseIds')) || [];
}

export function addReleaseToLocalStorage(releaseId) {
  let storedIds = getStoredReleaseIds();

  if (!storedIds.includes(releaseId)) {
    storedIds.push(releaseId);

    saveStoredReleaseIds(storedIds);
  }
}

export function removeReleaseFromLocalStorage(releaseId) {
  let storedIds = getStoredReleaseIds();
  storedIds = storedIds.filter(id => id !== releaseId);

  saveStoredReleaseIds(storedIds);
}
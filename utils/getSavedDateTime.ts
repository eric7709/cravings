export function getSavedDateTime(key: string = "currentDateTime"): Date | null {
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    return new Date(savedTime);
  }
  return null;
}

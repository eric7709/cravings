export function setCurrentDateTimeToLocalStorage(key: string = "currentDateTime") {
  const now = new Date().toISOString(); 
  localStorage.setItem(key, now);
}
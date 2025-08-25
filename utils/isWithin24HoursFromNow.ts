export function isWithin24HoursFromNow(date: Date): boolean {
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - date.getTime());
  const hoursDiff = diffMs / (1000 * 60 * 60);
  return hoursDiff <= 24;
}

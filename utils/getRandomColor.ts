export function getRandomColor() {
  const colors = [
    "#EF4444", // red-500
    "#F59E0B", // amber-500
    "#10B981", // green-500
    "#3B82F6", // blue-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
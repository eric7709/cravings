export const baseBgColors = [
  // Reds
  "bg-red-800", "bg-red-900",
  // Greens
  "bg-green-800", "bg-green-900",
  // Blues
  "bg-blue-800", "bg-blue-900", "bg-blue-950",
  // Amber
  "bg-amber-800", "bg-amber-900",
  // Fuchsia
  "bg-fuchsia-800", "bg-fuchsia-900",
  // Cyan
  "bg-cyan-800", "bg-cyan-900",
  // Rose
  "bg-rose-800", "bg-rose-900",
  // Emerald
  "bg-emerald-800", "bg-emerald-900",
  // Indigo
  "bg-indigo-800", "bg-indigo-900",
  // Orange
  "bg-orange-800", "bg-orange-900",
  // Pink
  "bg-pink-800", "bg-pink-900",
  // Lime
  "bg-lime-800", "bg-lime-900",
  // Violet
  "bg-violet-800", "bg-violet-900",
  // Teal
  "bg-teal-800", "bg-teal-900",
  // Purple
  "bg-purple-800", "bg-purple-900",
  // Sky
  "bg-sky-800", "bg-sky-900",

  // Neutral (has 950)
  "bg-neutral-800", "bg-neutral-900", "bg-neutral-950",
  // Stone (has 950)
  "bg-stone-800", "bg-stone-900", "bg-stone-950",
  // Gray (has 950)
  "bg-gray-800", "bg-gray-900", "bg-gray-950",
  // Slate (has 950)
  "bg-slate-800", "bg-slate-900", "bg-slate-950",
  // Zinc (has 950)
  "bg-zinc-800", "bg-zinc-900", "bg-zinc-950",
];

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Randomized export
export const bgColors = shuffleArray(baseBgColors);

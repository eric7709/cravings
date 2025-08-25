import { AnimatePresence, motion } from "framer-motion";

type Props = {
  item: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
  };
  idx: number;
};

const COLORS = [
  { bg: "bg-indigo-100 text-indigo-600", accent: "border-t-4 border-indigo-500 text-indigo-600", title: "text-indigo-500" },
  { bg: "bg-emerald-100 text-emerald-600", accent: "border-t-4 border-emerald-500 text-emerald-600", title: "text-emerald-500" },
  { bg: "bg-amber-100 text-amber-600", accent: "border-t-4 border-amber-500 text-amber-600", title: "text-amber-500" },
  { bg: "bg-rose-100 text-rose-600", accent: "border-t-4 border-rose-500 text-rose-600", title: "text-rose-500" },
];

export default function DashboardCard({ item, idx }: Props) {
  const { bg, accent, title } = COLORS[idx % COLORS.length];

  return (
    <motion.section
      key={item.title}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`rounded-xl lg:px-6 lg:py-6 py-10 px-7 bg-white shadow-md flex items-center justify-between 
                  hover:shadow-lg transition-all ${accent}`}
    >
      {/* Text block */}
      <div className="flex flex-col">
        <h3 className={`text-sm font-semibold mb-1 ${title}`}>{item.title}</h3>
        <AnimatePresence mode="popLayout">
          <motion.p
            key={item.value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`text-3xl font-bold ${accent.split(" ")[2]}`}
          >
            {item.value}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Icon block */}
      <div className={`h-14 w-14 shrink-0 grid place-content-center rounded-full ${bg}`}>
        <span className="text-2xl">{item.icon}</span>
      </div>
    </motion.section>
  );
}

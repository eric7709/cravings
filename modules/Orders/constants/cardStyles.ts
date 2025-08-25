
export const CARD_STYLES = {
  container: `
    w-full h-full flex flex-col  border border-slate-200 rounded-lg p-2.5 
    transition-all duration-150 ease-in-out bg-blue-50/50 backdrop-blur-2xl shadow hover:shadow-md hover:shadow-slate-200/40 
    hover:border-slate-300 hover:-translate-y-px
  `,
  cancelButton: {
    pending: "bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200",
    active: `bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 
            border-red-200 hover:border-red-300`,
  },
  statusBadge: `
    px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide
    whitespace-nowrap flex-shrink-0 border
  `,
  itemCard: `
    flex justify-between items-center py-1.5 px-2 bg-white rounded 
    border border-slate-100 hover:border-slate-200 transition-colors
  `,
  quantityBadge: `
    w-5 h-5 bg-indigo-100 text-indigo-700 rounded flex items-center 
    justify-center text-xs font-semibold flex-shrink-0
  `,
} as const;

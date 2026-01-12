import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function SummaryCards() {
  return (
    <div className=" mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Total Income */}
      <div className="
        bg-white
        rounded-xl
        px-4 py-3
        sm:px-5 sm:py-4
        flex items-center gap-3
        border border-gray-100
        shadow-sm
        hover:-translate-y-[2px]
        transition-all duration-200 ease-out
        border border-gray-200
        hover:border-slate-500

      ">
        <div className="
          h-8 w-8
          sm:h-9 sm:w-9
          rounded-lg
          bg-emerald-100
          flex items-center justify-center
          shrink-0
        ">
          <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Income
          </p>
          <p className="text-lg sm:text-xl font-semibold text-emerald-600 leading-tight">
            $10,550
          </p>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="
        bg-white
        rounded-xl
        px-4 py-3
        sm:px-5 sm:py-4
        flex items-center gap-3
        border border-gray-100
        shadow-sm
        hover:-translate-y-[2px]
        transition-all duration-200 ease-out
        border border-gray-200
        hover:border-slate-500
      ">
        <div className="
          h-8 w-8
          sm:h-9 sm:w-9
          rounded-lg
          bg-red-100
          flex items-center justify-center
          shrink-0
        ">
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Expenses
          </p>
          <p className="text-lg sm:text-xl font-semibold text-red-500 leading-tight">
            $2,423.95
          </p>
        </div>
      </div>

    </div>
  );
}

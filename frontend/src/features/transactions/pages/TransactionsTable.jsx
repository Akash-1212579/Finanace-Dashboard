import React, { useEffect, useState } from 'react'
export default function TransactionsTable({transactions}) {
if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-10">
        No transactions found
      </div>
    );
  }
console.log("table",transactions);
  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl overflow-x-auto">
      
      {/* Header */}
      <div
        className="
          min-w-[900px]
          grid grid-cols-5
          px-4 py-3
          bg-gray-50
          text-xs font-medium text-gray-600
        "
      >
        <div >Date</div>
        <div>Description</div>
        <div className='text-center'>Category</div>
        <div className="text-center">Amount</div>
        <div className="text-center">Mode</div>
      </div>

      {/* Rows */}
      <div className="min-w-[900px] divide-y ">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="
              grid grid-cols-5
              px-4 h-14
              items-center
              text-sm
              hover:bg-gray-50
              transition-colors
            "
          >
            <div className="text-gray-600 whitespace-nowrap">
              {tx.date}
            </div>

            <div className="truncate">
              {tx.description}
            </div>

            <div className=" text-center capitalize whitespace-nowrap">
              {tx.categoryId}
            </div>

            <div
              className={`text-center font-medium whitespace-nowrap ${
                tx.category === "income"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              ₹{tx.amount}
            </div>

            <div className="text-center text-gray-400 cursor-pointer whitespace-nowrap">
              {tx.paymentMode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

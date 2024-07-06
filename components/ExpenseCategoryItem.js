import { currencyFormatter } from "@/lib/utils";
import { useState } from "react";

import ViewExpenseModal from "./Modals/viewExpenseModal";


function ExpenseCategoryItem({expense }) {
  const [showviewExpenseModal,setviewExpenseModal]=useState(false);

  return (
    <>
    
    <ViewExpenseModal 
    show={showviewExpenseModal} 
    onClose={setviewExpenseModal}
    expense={expense}
    />

    <button onClick={()=>{
      setviewExpenseModal(true);
    }}>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: expense.color }}
          />
          <h4 className="capitalize">{expense.title}</h4>
        </div>
        <p>{currencyFormatter(expense.total)}</p>
      </div>
    </button>
    </>
  );
}

export default ExpenseCategoryItem;
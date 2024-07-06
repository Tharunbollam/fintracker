import { financecontext } from "@/lib/store/financecontext";

import { toast } from "react-toastify";
import Modal from "../Modal";

import {v4 as uuidv4} from "uuid";

import { useState,useContext,useRef } from "react";

function AddExpensesModal({show,onClose}){

    const [expenseAmount,setExpenseAmount]=useState("");

    const {expenses,addExpenseItem,addCategory}=useContext(financecontext);

    const titleRef=useRef();

    const colorRef=useRef();

    const [selecedCategory,setSelectedCategory]=useState("");

    const [showAddExpense,setShowAddExpense]=useState(false)

    const addExpenseItemHandler=async()=>{

        const expense=expenses.find(e=>{
            return e.id===selecedCategory;
        })
        const newExpense={
            color:expense.color,
            title:expense.title,
            total:expense.total + +expenseAmount,
            items:[
                ...expense.items,
                {
                    amount:+expenseAmount,
                    createdAt:new Date(),
                    id:uuidv4(),
                },
            ],
        };
        try{
        await addExpenseItem(selecedCategory,newExpense);
        console.log(newExpense);
        setExpenseAmount("")
        setSelectedCategory(null);
        onClose();
        toast.success("expense item added!!")
        }catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    };


    const addCategoryHandler=async()=>{
        const title=titleRef.current.value;
        const color=colorRef.current.value;
        try{
            await addCategory({title,color,total:0});
            setShowAddExpense(false);
            toast.success("category created!!")
        }catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
        <div className="flex flex-col gap-4">
        <label>Enter an amount...</label>
        <input type="number"
        min={.01}
        step={.01}
        placeholder="Enter expense Amount"
        value={expenseAmount}
        onChange={(e)=>{
            setExpenseAmount(e.target.value);
        }}
        ></input>

        </div>

        {/* expense categories */}


        {expenseAmount>0 && (
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-between">
                <h3 className="text-2xl capitalize">
                    select expense Category
                </h3>
                <button onClick={()=>{setShowAddExpense(true)}} className="text-lime-400 capitalize">+ Add new Category</button>
                </div>
                {showAddExpense &&(
                    <div className="flex items-center justify-between">
                    <input  type="text"
                    placeholder="enter title"
                    ref={titleRef}/>
                    <label>Pick Colour</label>
                   <input type="color" className="w-24 h-10" ref={colorRef}/>
                   <button onClick={addCategoryHandler} className="btn btn-primary-outline">Create</button>
                   <button onClick={()=>{
                    setShowAddExpense(false)
                   }} className="btn btn-danger">Cancel</button>
                   </div>
                )}
            {expenses.map((expense)=>{
                return (
                    <button
                    key={expense.id}
                    onClick={()=>{setSelectedCategory(expense.id)}}>
                        <div style={
                            {boxShadow:expense.id===selecedCategory ? "1px 1px 4px":"none",}
                        } className="flex items-center justify-between px-4 py-4 bg-slate-500 rounded-3xl">
                        <div className="flex items-center gap-2">
                        <div className="w-[25px] h-[25px] rounded-full"
                        style={{
                            backgroundColor:expense.color,
                        }}>
                        </div>
                        <h4 className="capitalize">{expense.title}</h4>
                    </div>
                    </div>
                    </button>
                );
            })
            }
            </div>
        )}


        {expenseAmount>0 && selecedCategory&&(
            <div className="mt-6">
                <button className="btn btn-primary" onClick={addExpenseItemHandler}> 
                Add Expense
               </button>
            </div>
        )}


        </Modal>
    
    );
}

export default AddExpensesModal;
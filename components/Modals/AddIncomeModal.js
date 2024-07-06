import { useState,useRef,useContext,useEffect} from "react";

import { currencyFormatter } from "@/lib/utils";

import {financecontext} from '@/lib/store/financecontext';

import { authContext } from "@/lib/store/auth-context";

import Modal from "../Modal";


import { toast } from "react-toastify";


// icons
import {FaRegTrashAlt} from "react-icons/fa";


function AddIncomeModal({show,onClose}){
    const amountRef=useRef();
    const descriptionRef=useRef();
    const {income,addIncomeItem,removeIncomeItem}=useContext(financecontext);

    const {user}=useContext(authContext);
    

    const addIncomeHandler=async(e)=>{
        e.preventDefault();

        const newIncome={
          amount:+amountRef.current.value,
          description:descriptionRef.current.value,
          createdAt: new Date(),
          uid:user.uid,
        };
        try{
        await addIncomeItem(newIncome);
          descriptionRef.current.value="";
          amountRef.current.value="";
          toast.success("income added succesfully");
        }catch(error){
          console.log(error.message);
          toast.error(error.message);
        }
    };
    
    const deleteIncomeEntryHandler=async(incomeId)=>{
        try{
            await removeIncomeItem(incomeId);
            toast.success("income deleted succesfully");
        }catch(error){
            console.log(error.message);
            toast.error(error.message);     
        }
    };
      
      


    return (
      <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className='input-group'>
      <div className='input-group'>
      <label htmlFor='amount'>Income Amount</label>
      <input type='number'
       name="amount"
       ref={amountRef}
        min={.01} 
        step={.01}
        placeholder='Enter Income Amount'></input>
      </div>

      <div className='input-group'>
      <label htmlFor='description'>Description</label>
      <input type='text' 
      name="description" 
      ref={descriptionRef}
       placeholder='Enter Income Description'></input>
      </div>
      
      <button className="btn btn-primary" type='submit'>Add entry</button>
      

      </form>

      <div className='flex flex-col gap-4 mt-6'>
        <h3 className='text-2xl font-bold'>Income History</h3>
        {income.map((i)=>{
          return (
            <div className='flex justify-between items-center' key={i.id}>
              <div>
            <p className='font-semibold'>{i.description}</p>
            <small className='text-xs'>{i.createdAt.toISOString()}</small>
            </div>
            <p className='flex items-center gap-2'>
              {currencyFormatter(i.amount)}
              <button onClick={()=>{deleteIncomeEntryHandler(i.id)}}><FaRegTrashAlt/></button>
            </p>
            </div>
          );
          })}
      </div>
      </Modal>
    );
}


export default AddIncomeModal;
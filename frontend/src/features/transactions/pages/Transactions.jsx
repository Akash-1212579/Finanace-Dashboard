import React from "react";
import SummaryCards from "./SummaryCards";
import FilterBar from "./FilterSection";
import { useState , useEffect} from "react";
import TransactionsTable from "./TransactionsTable";
import api from "./axiosInstance";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const[category,setCategory] = useState("");
  const[mode,setMode] = useState("");

  const[transactions,setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
    async function fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const res =await api.get("/gettransactions")
          setTransactions(res.data.transactions);
          //console.log("transactions are",res.data.transactions);
      } 
      catch (error) {
        console.log(error.message);
        setError(
          error.response?.data?.message || "Failed to fetch transactions"
        );
      }
      finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  },[])


  return (
    <div className="h-full h-screen flex flex-col">
      <div className="w-full p-1">
        <SummaryCards/>
       
       <FilterBar
  search={search}
  setSearch={setSearch}
  type={type}
  setType={setType}
  category = {category}
  setCategory = {setCategory}
  mode = {mode}
  setMode = {setMode}
/>

    
      </div>
    <div className="w-full">
    <TransactionsTable transactions={transactions} /> 
    </div>
      
    </div>
  );
}

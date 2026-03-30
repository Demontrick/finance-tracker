import { useState } from "react"
import { mockTransactions } from "../services/mockData"
import type { Transaction } from "../models/Transaction"

import AddTransactionModal from "../components/AddTransactionModal"
import SummaryCard from "../components/SummaryCard"
import TransactionList from "../components/TransactionList"
import FilterBar from "../components/FilterBar"
import FinanceChart from "../components/FinanceChart"

function Dashboard(){

const [transactions,setTransactions] =
useState<Transaction[]>(mockTransactions)

const [filter,setFilter] = useState("All")

const [showModal,setShowModal] = useState(false)

const [editing,setEditing] =
useState<Transaction | null>(null)

const addTransaction = (transaction:Transaction)=>{

if(editing){

setTransactions(

transactions.map(t=>
t.id === transaction.id ? transaction : t
)

)

setEditing(null)

}else{

setTransactions([

transaction,
...transactions

])

}

}

const deleteTransaction = (id:number)=>{

setTransactions(

transactions.filter(t=>t.id !== id)

)

}

const startEdit = (transaction:Transaction)=>{

setEditing(transaction)

setShowModal(true)

}

const filteredTransactions = transactions.filter(t=>{

if(filter==="All") return true

if(filter==="Income") return t.type==="Income"

if(filter==="Expense") return t.type==="Expense"

if(filter==="Pending") return t.status==="Pending"

if(filter==="Completed") return t.status==="Completed"

return true

})

const totalIncome = transactions
.filter(t=>t.type==="Income")
.reduce((sum,t)=>sum+t.amount,0)

const totalExpenses = transactions
.filter(t=>t.type==="Expense")
.reduce((sum,t)=>sum+t.amount,0)

const balance = totalIncome - totalExpenses

return(

<div style={{

background:"#0f172a",
minHeight:"100vh",
display:"flex",
justifyContent:"center"

}}>

<div style={{

width:"100%",
maxWidth:"1100px",
padding:"40px 20px",
color:"white"

}}>

<h1>Fintech Dashboard</h1>

<button

onClick={()=>{
setShowModal(true)
setEditing(null)
}}

style={{

background:"#7c3aed",
border:"none",
color:"white",
padding:"10px 18px",
borderRadius:"8px",
marginBottom:"20px",
cursor:"pointer"

}}

>

Add Transaction

</button>

<div style={{

display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",
marginBottom:"30px"

}}>

<SummaryCard
title="Balance"
amount={balance}
/>

<SummaryCard
title="Income"
amount={totalIncome}
color="#10b981"
/>

<SummaryCard
title="Expenses"
amount={totalExpenses}
color="#ef4444"
/>

</div>

<FinanceChart

income={totalIncome}

expenses={totalExpenses}

/>

<FilterBar
filter={filter}
setFilter={setFilter}
/>

<TransactionList

transactions={filteredTransactions}

onDelete={deleteTransaction}

onEdit={startEdit}

/>

{showModal && (

<AddTransactionModal

onAdd={addTransaction}

onClose={()=>{
setShowModal(false)
setEditing(null)
}}

existing={editing || undefined}

/>

)}

</div>

</div>

)

}

export default Dashboard
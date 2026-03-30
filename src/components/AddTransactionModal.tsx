import { useState } from "react"
import type { Transaction } from "../models/Transaction"

type Props = {

onAdd:(transaction:Transaction)=>void

onClose:()=>void

existing?:Transaction

}

function AddTransactionModal({onAdd,onClose,existing}:Props){

const [title,setTitle] =
useState(existing?.title || "")

const [amount,setAmount] =
useState(existing?.amount || 0)

const [type,setType] =
useState(existing?.type || "Expense")

const [status,setStatus] =
useState(existing?.status || "Pending")

const handleSubmit = ()=>{

if(!title || amount<=0) return

const newTransaction:Transaction = {

id: existing ? existing.id : Date.now(),

title,

amount,

type,

status,

date: existing
? existing.date
: new Date().toISOString().split("T")[0]

}

onAdd(newTransaction)

onClose()

}

return(

<div style={{

position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",

display:"flex",
justifyContent:"center",
alignItems:"center"

}}>

<div style={{

background:"#111827",
padding:"30px",
borderRadius:"12px",
width:"320px"

}}>

<h2>

{existing ? "Edit Transaction" : "Add Transaction"}

</h2>

<input
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}

style={{
width:"100%",
marginBottom:"10px",
padding:"8px"
}}
/>

<input
type="number"
value={amount}
onChange={e=>setAmount(Number(e.target.value))}

style={{
width:"100%",
marginBottom:"10px",
padding:"8px"
}}
/>

<select
value={type}
onChange={e=>setType(e.target.value)}

style={{
width:"100%",
marginBottom:"10px",
padding:"8px"
}}
>

<option>Expense</option>
<option>Income</option>

</select>

<select
value={status}
onChange={e=>setStatus(e.target.value)}

style={{
width:"100%",
marginBottom:"15px",
padding:"8px"
}}
>

<option>Pending</option>
<option>Completed</option>

</select>

<div style={{

display:"flex",
justifyContent:"space-between"

}}>

<button
onClick={onClose}

style={{

background:"#1f2937",
border:"none",
color:"white",
padding:"8px 15px",
borderRadius:"8px"

}}
>

Cancel

</button>

<button
onClick={handleSubmit}

style={{

background:"#7c3aed",
border:"none",
color:"white",
padding:"8px 15px",
borderRadius:"8px"

}}
>

{existing ? "Save" : "Add"}

</button>

</div>

</div>

</div>

)

}

export default AddTransactionModal
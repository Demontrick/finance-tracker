import type { Transaction } from "../models/Transaction"
import TransactionRow from "./TransactionRow"

type Props = {

transactions: Transaction[]

onDelete:(id:number)=>void

onEdit:(transaction:Transaction)=>void

}

function TransactionList({transactions,onDelete,onEdit}:Props){

return(

<div style={{

background:"#111827",
padding:"25px",
borderRadius:"12px"

}}>

<h2 style={{

marginTop:0,
marginBottom:"20px"

}}>

Transactions ({transactions.length})

</h2>

{transactions.length === 0 ? (

<div style={{

textAlign:"center",

padding:"30px",

color:"#9ca3af"

}}>

<h3 style={{marginBottom:"10px"}}>

No transactions found

</h3>

<p style={{margin:0}}>

Add a transaction or change filters

</p>

</div>

) : (

transactions.map(t=>(

<TransactionRow

key={t.id}

transaction={t}

onDelete={onDelete}

onEdit={onEdit}

/>

))

)}

</div>

)

}

export default TransactionList
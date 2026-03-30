import type { Transaction } from "../models/Transaction"
import { formatCurrency } from "../utils/format"

type Props = {

transaction: Transaction

onDelete:(id:number)=>void

onEdit:(transaction:Transaction)=>void

}

function TransactionRow({transaction,onDelete,onEdit}:Props){

const statusColor =
transaction.status === "Completed"
? "#10b981"
: "#f59e0b"

return(

<div

style={{

borderBottom:"1px solid #1f2937",
padding:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
borderRadius:"8px",
transition:"0.2s"

}}

onMouseEnter={(e)=>
e.currentTarget.style.background="#1f2937"
}

onMouseLeave={(e)=>
e.currentTarget.style.background="transparent"
}

>

<div>

<h3 style={{
margin:"0 0 5px 0",
fontWeight:"600"
}}>
{transaction.title}
</h3>

<p style={{
margin:0,
color:"#9ca3af",
fontSize:"14px"
}}>
{transaction.date}
</p>

</div>

<div style={{textAlign:"right"}}>

<p style={{

margin:0,

color: transaction.type === "Income"
? "#10b981"
: "#ef4444",

fontWeight:"bold",

fontSize:"18px"

}}>

{formatCurrency(transaction.amount)}

</p>

<div style={{

display:"flex",

gap:"8px",

justifyContent:"flex-end",

marginTop:"5px"

}}>

<span style={{

fontSize:"13px",

color:"#9ca3af"

}}>

{transaction.type}

</span>

<span style={{

background:statusColor,

padding:"3px 8px",

borderRadius:"20px",

fontSize:"12px",

fontWeight:"600",

color:"white"

}}>

{transaction.status}

</span>

</div>

<div style={{

marginTop:"10px",

display:"flex",

gap:"8px",

justifyContent:"flex-end"

}}>

<button

onClick={()=>onEdit(transaction)}

style={{

background:"#2563eb",
border:"none",
color:"white",
padding:"6px 12px",
borderRadius:"6px",
cursor:"pointer"

}}

>

Edit

</button>

<button

onClick={()=>onDelete(transaction.id)}

style={{

background:"#ef4444",
border:"none",
color:"white",
padding:"6px 12px",
borderRadius:"6px",
cursor:"pointer"

}}

>

Delete

</button>

</div>

</div>

</div>

)

}

export default TransactionRow
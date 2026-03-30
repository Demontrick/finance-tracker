type Props = {

filter:string

setFilter:(value:string)=>void

}

function FilterBar({filter,setFilter}:Props){

const buttonStyle = (name:string)=>({

padding:"8px 14px",
borderRadius:"8px",
border:"none",
cursor:"pointer",

background:
filter === name
? "#7c3aed"
: "#1f2937",

color:"white"

})

return(

<div style={{

display:"flex",
gap:"10px",
marginBottom:"20px",
flexWrap:"wrap"

}}>

<button
style={buttonStyle("All")}
onClick={()=>setFilter("All")}
>
All
</button>

<button
style={buttonStyle("Income")}
onClick={()=>setFilter("Income")}
>
Income
</button>

<button
style={buttonStyle("Expense")}
onClick={()=>setFilter("Expense")}
>
Expense
</button>

<button
style={buttonStyle("Pending")}
onClick={()=>setFilter("Pending")}
>
Pending
</button>

<button
style={buttonStyle("Completed")}
onClick={()=>setFilter("Completed")}
>
Completed
</button>

</div>

)

}

export default FilterBar
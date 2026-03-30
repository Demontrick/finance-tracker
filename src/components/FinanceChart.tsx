import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts"

type Props = {
income:number
expenses:number
}

function FinanceChart({income,expenses}:Props){

const data = [

{
name:"Income",
amount:income
},

{
name:"Expenses",
amount:expenses
}

]

return(

<div style={{

background:"#111827",
padding:"25px",
borderRadius:"12px",
marginBottom:"30px"

}}>

<h2 style={{
marginTop:0,
marginBottom:"20px",
fontSize:"20px",
fontWeight:600
}}>
Financial Overview
</h2>

<div style={{
width:"100%",
height:"300px"
}}>

<ResponsiveContainer width="100%" height="100%">

<BarChart data={data}>

<CartesianGrid
strokeDasharray="3 3"
stroke="#374151"
/>

<XAxis
dataKey="name"
stroke="#9ca3af"
/>

<YAxis
stroke="#9ca3af"
tickFormatter={(value)=>`$${value}`}
/>

<Tooltip
contentStyle={{
background:"#1f2937",
border:"none",
borderRadius:"8px"
}}
formatter={(value)=>[`$${value}`,"Amount"]}
/>

<Bar
dataKey="amount"
radius={[8,8,0,0]}
fill="#7c3aed"
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

)

}

export default FinanceChart
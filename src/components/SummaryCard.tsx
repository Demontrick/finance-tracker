type Props = {

title:string

amount:number

color?:string

}

function SummaryCard({title,amount,color}:Props){

return(

<div style={{

background:"#111827",
padding:"22px",
borderRadius:"12px"

}}>

<p style={{

margin:0,
color:"#9ca3af"

}}>

{title}

</p>

<h2 style={{

marginTop:"10px",
color: color || "white"

}}>

${amount}

</h2>

</div>

)

}

export default SummaryCard
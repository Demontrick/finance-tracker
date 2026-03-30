import type  { Transaction } from "../models/Transaction"

export const mockTransactions: Transaction[] = [

{
id:1,
title:"Salary",
amount:4200,
type:"Income",
status:"Completed",
date:"2026-03-01"
},

{
id:2,
title:"Freelance Payment",
amount:950,
type:"Income",
status:"Completed",
date:"2026-03-12"
},

{
id:3,
title:"Rent",
amount:1300,
type:"Expense",
status:"Completed",
date:"2026-03-03"
},

{
id:4,
title:"Groceries",
amount:210,
type:"Expense",
status:"Completed",
date:"2026-03-08"
},

{
id:5,
title:"Netflix Subscription",
amount:15,
type:"Expense",
status:"Completed",
date:"2026-03-10"
},

{
id:6,
title:"Gym Membership",
amount:45,
type:"Expense",
status:"Pending",
date:"2026-03-28"
},

{
id:7,
title:"Stock Dividend",
amount:120,
type:"Income",
status:"Completed",
date:"2026-03-15"
},

{
id:8,
title:"Electricity Bill",
amount:95,
type:"Expense",
status:"Pending",
date:"2026-03-25"
}

]
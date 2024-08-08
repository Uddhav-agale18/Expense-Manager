export interface Expense {
    _id?:string
    etype: string,
    title: string,
    desc: string,
    date: Date,
    amount: number,
    isActive:boolean,
    tags: [
        {
            key: string,
            value: string
        }
    ]

}
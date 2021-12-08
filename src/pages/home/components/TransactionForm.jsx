// hooks
import { useState } from "react"



export default function TransactionForm() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name : </span>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
                </label>
                <label>
                    <span>Amount ($) : </span>
                    <input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />
                </label>
                <button type="submit">Submit Transaction</button>
            </form>
        </div>
    )
}

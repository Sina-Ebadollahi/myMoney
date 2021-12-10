// hooks
import { useEffect, useState } from "react"
import { UseFirestore } from "../../../hooks/UseFirestore";

export default function TransactionForm({ user }) {
    const { addDocumentToFireStore, response } = UseFirestore('transactions');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        addDocumentToFireStore({name, amount, uid: user.uid })
    }
    // resetting the form field on Sucess
    useEffect(() => {
        if(response.success){
            setName('');
            setAmount('');
        }
    },[response.success])
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
                    <input type="number" min={0} onChange={(e) => setAmount(e.target.value)} value={amount} />
                </label>
                <button type="submit">Submit Transaction</button>
            </form>
        </div>
    )
}



import { UseFirestore } from '../../../hooks/UseFirestore'
import './TransactionList.css'

export default function TransactionList({ getData }) {
    const { deleteDocumentFromFireStore } = UseFirestore('transactions');
    function handleDeleteClick(e, id){
        deleteDocumentFromFireStore(id)
    }
    return (
        <ul className='transactions'>
            {getData.map((transaction) => {
                return(
                    <li key={transaction.id}>
                        <p className='name'>
                            {transaction.name}
                        </p>
                        <p className='amount'>$ {transaction.amount}</p>
                        <h5 onClick={(e) => {handleDeleteClick(e, transaction.id)}}>Delete Transaction</h5>
                    </li>
                )
            })
            }

            
        </ul>
    )
}

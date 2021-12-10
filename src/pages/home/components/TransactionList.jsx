

import './TransactionList.css'

export default function TransactionList({ getData }) {
    return (
        <ul className='transactions'>
            {getData.map((transaction) => {
                return(
                    <li key={transaction.id}>
                        <p className='name'>
                            {transaction.name}
                        </p>
                        <p className='amount'>$ {transaction.amount}</p>

                    </li>
                )
            })
            }

            
        </ul>
    )
}

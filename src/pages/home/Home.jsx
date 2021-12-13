
// components 
import TransactionForm from '../home/components/TransactionForm'
import TransactionList from './components/TransactionList';
// style
import styles from './Home.module.css'
// hooks
import UseAuth from '../../hooks/UseAuth'
import { UseCollection } from '../../hooks/UseCollection';


export default function home() {
    const { user, error:authError } = UseAuth();
    const _query = user ? ["uid","==",user.uid] : null;
    const{  getData, error } = UseCollection(
        'transactions',
        _query,
        ['createdAt','asc']
        )
        console.log(`user : ${user}, error : ${authError}, getData : ${getData}`);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {getData && <TransactionList getData={getData}/>}
            </div>
            <div className={styles.sidebar}>
            <TransactionForm user={user} />
            </div>
        </div>
    )
}

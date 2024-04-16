import {useState} from 'react'
import {canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import styles from './styles.module.scss'
import {Header} from '../../components/Header'
import {FiRefreshCcw } from 'react-icons/fi'
import Modal from 'react-modal'
import {ModalOrder} from '../../components/ModalOrder'

import {SetUpAPI} from '../../services/api'

type OrderProps = {
    id:string;
    table:string;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrderProps[];
}

export type OrderItemProps = {
    id:string;
    amount: number;
    order_id: string;
    product_id: string;

    product:{
      id: string;
      name: string;
      price: string;
      description: string;
      banner: string;

    };
     order:{
        id:string;
        table: string | number;
        status: boolean;
        name: string | null
    };
}

export default function Dashboard({orders}: HomeProps){

    const[orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false);

    function CloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModal(id: string){
        
        const apiClient = SetUpAPI();

        const response = await apiClient.get('/order/details',{
            params:{
                order_id: id
            }
        })

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishModal(id: string)
    {
        const apiClient = SetUpAPI();
        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders');

        setOrderList(response.data);
        setModalVisible(false);

    }

    Modal.setAppElement('#__next')

    return(
        <>
        <Head>
          <title>Painel - Peça Rápido</title>
        </Head>

        <div>

        <Header/>

        <main className={styles.container}>

            <div className={styles.containerHeader}>

                <h1>Últimos Pedidos</h1>

                <button>
                    <FiRefreshCcw size={25} color="#3fffa3"/>
                </button>

            </div>

            <article className={styles.listOrders}>

                {orderList.map(item => (

                <section key={item.id} className={styles.orderItem}>
                    <button onClick={() => handleOpenModal(item.id)}>
                        <div className={styles.tag}>

                            <span>Mesa {item.table}</span>

                        </div>
                    </button>
                </section>
                ))}
                

            </article>

        </main>

        {modalVisible && (
            <ModalOrder
             isOpen={modalVisible}
             onRequestClose={CloseModal}
             order ={modalItem}
             handleFinishOrder={handleFinishModal}
            />
        )}
        
        </div>
        </>  
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    //Devolve essa funcionalidade no servidor -> metodo getServerSideProps

    const apiClient = SetUpAPI(ctx);

    const response = await apiClient.get('/orders');

    
    return{
       props: {
        orders: response.data
       } 
    }
})
import {useContext} from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import {FiLogOut} from 'react-icons/fi'

import {AuthContext} from '../../context/AuthContext'

export function Header(){

    const {signOut} = useContext(AuthContext)
    return(
     <header className={styles.headerContainer}>
        <div className={styles.headerContent}>

            <Link href="/dashboard">
             <img src="logo2.svg" width={410} height={560} />
            </Link>

            <nav className={styles.menuNav}>
                <Link href='/category' legacyBehavior>
                 <a>Categoria</a>
                </Link>

                <Link href='/product' legacyBehavior>
                 <a>Cardapio</a>
                </Link>

                <button onClick={signOut}>
                    <FiLogOut color = "#FFF" size={24}/>
                </button>

               
            </nav>

        </div>
     </header>
    )
        
    
}
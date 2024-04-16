import {useContext, FormEvent, useState} from 'react'
import Head from 'next/head' 
import styles from '../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../public/logo2.svg'
import {Input} from '../components/ui/input'
import {Button} from '../components/ui/Button'

import {AuthContext} from '../context/AuthContext'

import Link from 'next/link' //Esse componente permite trabalhar com a navegação



import {canSSR } from '../utils/canSSR'

export default function Home() {

  const {signIn} = useContext(AuthContext)
  
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){

    event.preventDefault();

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)


    setLoading(false);

  }
  return (
  <>
    <Head>
      <title>PeçaRapido - Faça seu Login</title>
    </Head>

    <div className={styles.containerCenter}>
      <Image src={logoImg} alt = "Logo Peça Rapido" />

      <div className={styles.Login}>
        <form onSubmit={handleLogin}>
         <Input
          placeholder='Digite seu email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         />
         <Input
          placeholder='Digite sua senha'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         />

         <Button
          type="submit"
          loading={loading}         
         >

          Acessar
         </Button>
        </form>
        
        <Link href="/cadastro" legacyBehavior>

        <a className={styles.text}>Não possui uma conta? Cadastre-se</a>

        </Link>
      </div>
    </div>
  </>
      
  )
}


export const getServerSideProps = canSSR(async(ctx)=>{
  return {
    props: {}
  }
})
import {useState, FormEvent, useContext} from 'react'
import Head from 'next/head' 
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logo2.svg'
import {Input} from '../../components/ui/input'
import {Button} from '../../components/ui/Button'

import {AuthContext} from '../../context/AuthContext' 

import Link from 'next/link' //Esse componente permite trabalhar com a navegação

export default function Cadastro() {

  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
     event.preventDefault();

     if(name === '' || email === '' || password === ''){
       alert("Preencha Todos os Campos")
       return;
     }

     setLoading(true);

     let data ={
      name,
      email,
      password
     }

     await signUp(data)

     setLoading(false);
  }
  return (
  <>
    <Head>
      <title>Faça seu Cadastro</title>
    </Head>

    <div className={styles.containerCenter}>
      <Image src={logoImg} alt = "Logo Peça Rapido" />

      <div className={styles.Login}>
        <h1>Criando sua Conta</h1>
        <form onSubmit={handleSignUp}>

        <Input
          placeholder='Digite seu nome'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
         />

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

          Cadastrar
         </Button>
        </form>
        
        <Link href="/" legacyBehavior>

        <a className={styles.text}>Já possui uma conta? Faça Login!</a>

        </Link>
      </div>
    </div>
  </>
      
  )
}

import {createContext, ReactNode, useState, useEffect} from 'react';
import {api} from '../services/apiClient'

import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;

    signIn: (credentials: SignInProps) => Promise<void>;
    signOut:() => void; 
    signUp: (credentials: SignUpProos) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email:string,
}


type SignInProps = {
    email: string;
    password: string;
}

type SignUpProos = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){

    try{
       destroyCookie(undefined, '@pecaRapido.token') 
       Router.push('/') //Manda o us para a tela principal(Login)
    }catch{
      console.log('Erro ao deslogar')
    }

}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; //Forca o User para 
    
    useEffect(()=>{

        const {'@pecaRapido.token': token} = parseCookies();

        if(token){
            api.get('/infous').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                signOut();
            })
        }

    }, [])


    async function signIn({email,password}: SignInProps){
        try{

            const response = await api.post('/login', {
                email,
                password
            })
            
            const {id, name, token} = response.data;

            setCookie(undefined, '@pecaRapido.token', token, {
                maxAge: 60 * 60 * 24 * 30, //Expira em um mes
                path: "/" //Todos os caminhos tem acesso ao token
            })

            setUser({
                id,
                name,
                email,
            })

            //Passa o token para as proximas requisições
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redireciona o user para a página de ultimos pedidos
            Router.push('/dashboard')

        }catch(err){
           console.log("Erro ao acessar", err)
        }

    }

    async function signUp({name,email, password}: SignUpProos){
       
        try{

            const response = await api.post('/users',{
                name,
                email,
                password
            })

            console.log("Cadastrado com Sucesso!")

            Router.push('/')

        }catch(err){
          console.log("Erro ao cadastrar cliente", err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}
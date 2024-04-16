import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {parseCookies, destroyCookie} from 'nookies'
import {TokenError} from '../services/errors/TokenError'

export function canSSRAuth<P>(fn:GetServerSideProps<P> ){
     return async (ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        
        const cookies = parseCookies(ctx);

        const token = cookies['@pecaRapido.token'];

        if(!token){
            return{
                redirect:{
                    destination:'/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(ctx);
        }catch(err){
           if(err instanceof TokenError){
              destroyCookie(ctx, '@pecaRapido.token')

              return{
                redirect:{
                    destination: '/',
                    permanent:false
                }
              }
           }
        }
     }
}
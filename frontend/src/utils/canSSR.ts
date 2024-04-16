import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {parseCookies} from 'nookies'


//Paginas acessadas somentes por us não logados

export function canSSR<P>(fn:GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx);
        
       
       if(cookies['@pecaRapido.token']){
          return{
            redirect:{
                destination: '/dashboard',
                permanent:false,
            }
          }
       }

      return await fn(ctx);  

    }
}
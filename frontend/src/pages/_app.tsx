import '../styles/globals.scss'

//TSX COMPONENTE DO REACT
import type { AppProps } from 'next/app'
import {AuthProvider} from '../context/AuthContext'

//TODA VEZ QUE UMA PAGINA É ABERTA, ELE É RENDERAZIDO AQUI

export default function App({ Component, pageProps }: AppProps) {
  return( 
  <AuthProvider>
  <Component {...pageProps} /> 
  </AuthProvider>
  )
}

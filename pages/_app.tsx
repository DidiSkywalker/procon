import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pro-Con List</title>
      </Head>
      <div className="p-5 bg-gray-900">
        <Component {...pageProps} />
      </div>
    </>
  )
}

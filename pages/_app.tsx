import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pros &amp; Cons List</title>
      </Head>
      <div className="p-5 md:max-w-6xl md:w-full md:mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  )
}

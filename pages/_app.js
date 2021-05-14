import { ContextProvider } from '../_context'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextProvider>
    )
}

export default MyApp

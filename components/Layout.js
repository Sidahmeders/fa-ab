import NavBar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import styles from '../styles/Layout.module.css'
import Meta from './Meta'

const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <NavBar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Navbar.module.scss'
import { useRouter } from 'next/router'
import NavItem from './NavbarItem'

export function NavBar() {
    const { pathname } = useRouter()

    const [offset, setOffset] = useState(0)
    const [navClass, setNavClass] = useState(styles.navbar)

    const [burgerLineClass, setBurgerLineClass] = useState(styles.line)
    const [burgerState, setBurgerState] = useState(true)

    const toggleSideBar = () => {
        if (burgerState) {
            openSideBar()
        } else {
            closeSideBar()
        }
    }

    const openSideBar = () => {
        setBurgerLineClass(() => `${styles.line} ${styles.open}`)
        setNavClass(() => `${styles.navbar} ${styles.on}`)
        setBurgerState(() => false)
    }

    const closeSideBar = () => {
        setBurgerLineClass(() => styles.line)
        setNavClass(() => styles.navbar)
        setBurgerState(() => true)
    }

    useEffect(() => {
        closeSideBar()
    }, [pathname])

    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset)
        }
    }, [])

    useEffect(() => {
        if (offset > 50 && window.innerWidth > 969) {
            setNavClass(() => `${styles.navbar} ${styles.show} $`)
        } else if (window.innerWidth > 969) {
            setNavClass(() => styles.navbar)
        }
    })

    return (
        <>
            <div className={navClass}>
                <div className={styles.burger} onClick={toggleSideBar}>
                    <span className={burgerLineClass}></span>
                    <span className={burgerLineClass}></span>
                    <span className={burgerLineClass}></span>
                </div>
                <section className={styles.logo}>
                    <Link href="/">FaAbrahem</Link>
                </section>
                <div className={styles.topLinks}>
                    <ul>
                        <NavItem href="/covid" text="| Covid" />
                        <NavItem href="/blogs" text="| Blogs" />
                        <NavItem href="/contact-us" text="| Contact Us" />
                        <li>
                            <a
                                target="_blank"
                                href="https://www.redcross.org/donate/donation.html/">
                                | Donate
                            </a>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a>How We Grant</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="dummy link2" />
                                <NavItem href="/sub" text="dummy link3" />
                                <NavItem href="/sub" text="something else" />
                            </ul>
                        </li>
                        <li>
                            <a>How You Give</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="dummy link2" />
                                <NavItem href="/sub" text="dummy link3" />
                                <NavItem href="/sub" text="dummy link4" />
                                <NavItem href="/sub" text="something else" />
                            </ul>
                        </li>
                        <li>
                            <a>Fundholders</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="dummy link2" />
                                <NavItem href="/sub" text="dummy link3" />
                                <NavItem href="/sub" text="dummy link4" />
                            </ul>
                        </li>
                        <li>
                            <a>Nonprofits</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="dummy link2" />
                                <NavItem href="/sub" text="something else" />
                            </ul>
                        </li>
                        <li>
                            <a>Advisors</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="dummy link2" />
                                <NavItem href="/sub" text="dummy link3" />
                            </ul>
                        </li>
                        <li>
                            <a>Our Community</a>
                            <ul>
                                <NavItem href="/sub" text="dummy link1" />
                                <NavItem href="/sub" text="something else" />
                            </ul>
                        </li>
                        <li className={styles.about}>
                            <Link href="/about">About Us</Link>
                        </li>
                    </ul>
                </nav>

                <section className={styles.searchbar}>
                    <div className={styles.container}>
                        <input type="text" placeholder="Search..." />
                        <div className={styles.search}></div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default NavBar

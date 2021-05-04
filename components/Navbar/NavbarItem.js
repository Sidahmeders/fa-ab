import Link from 'next/link'

function NavbarItem({ href, text }) {
    return (
        <>
            <li>
                <Link href={href}>{text}</Link>
            </li>
        </>
    )
}

export default NavbarItem

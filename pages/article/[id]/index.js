import { server } from '../../../config/index'
import Link from 'next/link'
import Meta from '../../../components/Meta'

export default function article({ article = { title: 'cool', body: 'cool body' } }) {
    return (
        <>
            <Meta title={article.title} />
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <Link href="/">Go Back</Link>
        </>
    )
}

// export const getStaticProps = async ({ params }) => {
//     const response = await fetch(`${server}/api/articles/${params.id}`)
//     const article = await response.json()
//     return {
//         props: {
//             article
//         },
//         revalidate: 900000
//     }
// }

// export const getStaticPaths = async () => {
//     const response = await fetch(`${server}/api/articles/`)
//     const articles = await response.json()
//     const ids = articles.map((artcile) => artcile.id)
//     const paths = ids.map((id) => ({
//         params: { id: id.toString() }
//     }))
//     return {
//         paths,
//         fallback: false
//     }
// }

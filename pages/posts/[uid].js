import { client } from '../../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import Prismic from 'prismic-javascript'
import styles from '../../styles/Prismic.module.scss'

export default function Post({ data }) {
    const { title, subtitle, main_text, featured_image } = data
    return (
        <>
            <article>
                <header className={styles.title}>{RichText.render(title)}</header>
                <h3>{subtitle}</h3>
                <hr />
                <hr />
                <main>{RichText.render(main_text)}</main>
                <img className={styles.images} src={featured_image.url} alt={featured_image.alt} />
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    const { uid } = params
    const { data } = await client.getByUID('blog_post', uid)
    return {
        props: { data }
    }
}

export async function getStaticPaths() {
    const { results } = await client.query(Prismic.Predicates.at('document.type', 'blog_post'))

    const paths = results.map((post) => ({
        params: {
            uid: post.uid
        }
    }))
    return {
        paths,
        fallback: false
    }
}

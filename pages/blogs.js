import Prismic from 'prismic-javascript'
import { client } from '../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'
import styles from '../styles/Prismic.module.scss'

export default function index({ home, posts, response }) {
    const { background_image, about, team_quote, team_image, featured_video } = home.data
    console.log(response)
    return (
        <div className={styles.container}>
            {/* <h1>Home data</h1>
            <p>background_image</p>
            <img className={styles.images} src={background_image.url} alt={background_image.alt} />
            <h2>about: {RichText.asText(about)}</h2>
            <p>team_quote: {team_quote}</p>
            <img className={styles.images} src={team_image.url} alt={team_image.alt} />

            <div
                className={styles.youtube}
                dangerouslySetInnerHTML={{ __html: featured_video.html }}></div> */}

            {posts.results.map((post) => {
                const { title, subtitle, featured_image } = post.data
                return (
                    <div className={styles.blog} key={post.uid}>
                        <Link href={`/posts/${post.uid}`}>
                            <a>
                                <h3>{RichText.asText(title)}</h3>
                                <img
                                    className={styles.images}
                                    src={featured_image.url}
                                    alt={featured_image.alt}
                                />
                                <p>{subtitle}</p>{' '}
                            </a>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps() {
    // To retrieve the API object, check out the How to Query the API page
    // response is the response object, response.results holds the documents
    const response = await client.query(Prismic.Predicates.at('document.type', 'blog_post'), {
        orderings: '[my.product.price desc]',
        pageSize: 4,
        page: 2
    })

    // prismic api calls
    const home = await client.getSingle('home')
    const posts = await client.query(Prismic.Predicates.at('document.type', 'blog_post'), {
        orderings: '[document.first_publication_date desc]'
    })
    return {
        props: {
            home,
            posts,
            response
        }
    }
}

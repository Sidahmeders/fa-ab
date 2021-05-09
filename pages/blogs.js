import Prismic from 'prismic-javascript'
import { client } from '../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'
import styles from '../styles/Prismic.module.scss'
import { useState, useEffect } from 'react'
import { ContextConsumer } from './_context'
import { useContext } from 'react'

let pageSizeNumber = 4
let totalResultsSize

export default function index({ home }) {
    // const { background_image, about, team_quote, team_image, featured_video } = home.data
    const context = useContext(ContextConsumer)
    const { pageNumber, setPageNumber } = context

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(async () => {
        const props = await client.query(Prismic.Predicates.at('document.type', 'blog_post'), {
            orderings: '[document.first_publication_date desc]',
            pageSize: pageSizeNumber,
            page: pageNumber
        })
        setPosts(() => props.results)
        totalResultsSize = props.total_results_size + 1
        setTotalPages(() => Math.round(totalResultsSize / pageSizeNumber))
    }, [pageNumber])

    const paginate = (e) => {
        e.preventDefault()
        const targetPageNumber = e.target.innerText
        setPageNumber(() => targetPageNumber)
    }

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
            <div className={styles.blogs}>
                {posts.length ? (
                    posts.map((post) => {
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
                                        <p>{subtitle}</p>
                                    </a>
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <h2>loading....</h2>
                )}
            </div>
            <div className={styles.pagination}>
                {Array(totalPages)
                    .fill()
                    .map((value, number) => (
                        <a
                            className={number === pageNumber - 1 ? styles.highlight : ''}
                            key={number}
                            onClick={paginate}>
                            {number + 1}
                        </a>
                    ))}
                <a>next</a>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // To retrieve the API object, check out the How to Query the API page
    // response is the response object, response.results holds the documents
    const home = await client.getSingle('home')

    return {
        props: {
            home
        }
    }
}

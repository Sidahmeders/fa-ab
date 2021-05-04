import Link from 'next/link'
import styles from '../../styles/Article.module.scss'

const Article = ({ article }) => {
    return (
        <Link href={`/article/${article.id}`}>
            <a className={styles.card}>
                <h3 className={styles.title}>{article.title} &rarr;</h3>
                <p>{article.body}</p>
            </a>
        </Link>
    )
}

export default Article

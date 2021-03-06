import articleStyles from '../../styles/Article.module.scss'
import Article from './Article'

const ArticleList = ({ articles }) => {
    return (
        <div className={articleStyles.grid}>
            {articles.map((article) => (
                <Article key={article.id} article={article} />
            ))}
        </div>
    )
}

export default ArticleList

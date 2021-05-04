import Hero from './Hero'
import ArticleList from '../articles/ArticleList'

const index = ({ articles }) => {
    return (
        <div>
            <Hero />
            <ArticleList articles={articles} />
        </div>
    )
}

export default index

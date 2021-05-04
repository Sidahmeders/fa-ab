import Meta from '../components/Meta'
import Home from '../components/home/index'

export default function Index({ articles }) {
    return (
        <div className="index">
            <Meta />
            <Home articles={articles} />
        </div>
    )
}

export async function getStaticProps() {
    // jsonsplaceholder api calls
    let articles = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
    articles = await articles.json()
    return {
        props: {
            articles
        }
    }
}

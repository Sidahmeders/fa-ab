const { articles } = require('../../../data')

export default function handler({ query: { id } }, res) {
    const article = articles.filter(article => article.id == id)

    if (article.length > 0) {
        res.status(200).json(article[0])
    } else {
        res.status(404).json({message: `article ${id} is not found`})
    }
}
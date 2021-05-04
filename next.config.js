// module.exports = {
//     async rewrites() {
//         return [{ source: '/covid', destination: 'https://www.worldometers.info/coronavirus/' }]
//     }
// }

module.exports = {
    images: {
        loader: 'imgix',
        path: 'http://localhost:3000/'
    }
}

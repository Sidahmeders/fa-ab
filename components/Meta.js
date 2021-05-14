import Head from 'next/head'

function Meta({ title, keywords, description }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
            </Head>
        </>
    )
}

Meta.defaultProps = {
    title: 'Father Abaraham Non Profit',
    keywords: 'organization, non profit, donations, charity, philanthropy',
    description: 'Get the latest news about our non profit organization'
}

export default Meta

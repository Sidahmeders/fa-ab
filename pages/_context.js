import { createContext, useState } from 'react'

const Context = createContext()

function ContextProvider(props) {
    const fetchJsonData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/')
        console.log(response)
    }

    const [pageNumber, setPageNumber] = useState(1)

    return (
        <Context.Provider
            value={{
                fetchJsonData,
                pageNumber,
                setPageNumber
            }}>
            {props.children}
        </Context.Provider>
    )
}

const ContextConsumer = Context

export { ContextProvider, ContextConsumer }

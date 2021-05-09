import { createContext, useState } from 'react'

const Context = createContext()

function ContextProvider(props) {
    const [pageNumber, setPageNumber] = useState(1)

    // this is just a test data dont fuck it in production
    const [customerData, setCustomerData] = useState({
        full_name: 'Ahmed Boutaraa',
        email: 'sudizoldik@gmail.com',
        phone_number: '0552104709',
        girl_friend: null,
        pets: [{ dog: null, cat: ['samso', 'nino', 'nona', 'towati'] }],
        hobies: ['swimming', 'calisthenics', 'boxing', 'jogging', 'reading manga & books'],
        donationAmount: 50
    })

    return (
        <Context.Provider
            value={{
                customerData,
                setCustomerData,
                pageNumber,
                setPageNumber
            }}>
            {props.children}
        </Context.Provider>
    )
}

const ContextConsumer = Context

export { ContextProvider, ContextConsumer }

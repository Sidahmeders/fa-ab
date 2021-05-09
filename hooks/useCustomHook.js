import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

function getSavedValue(key, initialValue) {
    const storedValue = JSON.parse(localStorage.getItem(key))
    if (storedValue !== null) {
        return storedValue
    }

    if (initialValue instanceof Function) {
        return initialValue()
    }

    return initialValue
}

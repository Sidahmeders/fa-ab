import React, { useEffect, useRef, useState } from 'react'

const InputModal = ({ initialValue, onClose, onSubmit }) => {
    const [value, setValue] = useState(initialValue)
    const inputRef = useRef(null)
    const modalRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        document.body.addEventListener('click', onClickOutside)
        return () => document.removeEventListener('click', onClickOutside)
    }, [])

    const onClickOutside = (e) => {
        const element = e.target
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault()
            e.stopPropagation()
            onClose()
        }
    }

    const onChange = (e) => setValue(e.target.value)

    const onSub = (e) => {
        e.preventDefault()
        onSubmit(value)
        onClose()
    }

    return (
        <div className="modal--overlay">
            <div className="modal" ref={modalRef}>
                <h1>Insert a new value</h1>
                <form action="?" onSubmit={onSub}>
                    <input ref={inputRef} type="text" onChange={onChange} value={value} />
                    <button>Save new value</button>
                </form>
            </div>
        </div>
    )
}

export default InputModal

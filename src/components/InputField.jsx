import React from 'react'

const InputField = ({ text, handleInput, handleSubmit, title }) => {
    return (
        <label>
            <input value={text} onChange={(e) => { handleInput(e.target.value) }}></input>
            <button onClick={handleSubmit}>{title}</button>
        </label>
    )
}

export default InputField
const Input = ({ type, name, classNames, placeholder, handleChange }) => {
    return (
        <input type={type} name={name} className={classNames} onChange={handleChange} placeholder={placeholder} />
    )
}

export default Input;
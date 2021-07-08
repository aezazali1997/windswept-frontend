const Input = ({ type, name, classNames, placeholder }) => {
    return (
        <input type={type} name={name} className={classNames} placeholder={placeholder} />
    )
}

export default Input;
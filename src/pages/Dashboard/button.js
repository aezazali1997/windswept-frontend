const Button = ({ label, classNames, onClick }) => {

    return (
        <button className={classNames} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;
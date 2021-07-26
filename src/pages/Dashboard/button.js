const Button = ({ label, classNames, onClick, disabled, type }) => {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames}
        >
            {label}
        </button>
    )
}

export default Button;
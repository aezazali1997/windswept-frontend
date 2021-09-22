const Button = ({ label, classNames, onClick, disabled, type, ...props }) => {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames}
            {...props}
        >
            {label}
        </button>
    )
}

export default Button;
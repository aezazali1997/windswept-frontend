const Button = ({ label, classNames, onClick, disabled }) => {

    return (
        <button className={classNames} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}

export default Button;
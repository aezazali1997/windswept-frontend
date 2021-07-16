const InputField = ({ label, inputClass, svg, name, type, value, onChange, onBlur, error }) => {
    return (
        <div className={`floating-input ${error ? "mb-1" : "mb-5"} relative`}>
            <input
                type={type}
                id={name}
                name={name}
                className={inputClass}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="name@example.com"
                autoComplete="on" />
            <label
                htmlFor="username"
                className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                {label}
            </label>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                {svg}
            </div>
        </div>
    )
}

export default InputField;
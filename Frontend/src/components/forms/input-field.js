import PropTypes from 'prop-types'

export default function InputField({
    name,
    type,
    label,
    error,
    ...props
}) {
    return (
        <div className="flex flex-col">
            <label class="text-left text-gray-500" for={name}>{label}</label>
            <input 
                class="
                    bg-white border-2 
                    border-gray-600 
                    focus:outline-none 
                    transition
                    duration-300 
                    focus:border-black
                    px-4 
                    py-3
                    mt-2"
                id={name}
                type={type}
                name={name}
                {...props}
            />
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

InputField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string
}
import PropTypes from 'prop-types'

export default function Tab({children, ...props}) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

Tab.propTypes = {
    children: PropTypes.object,
}
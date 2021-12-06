import PropTypes from 'prop-types'

export default function AdBanner({imageUrl, link, counter}) {
    return (
        <div className="shadow-md">
            <a href={link}>
                <img className="w-48 h-48 mx-auto" src={imageUrl} alt="Reklama" />
            </a>
            <p className="p-4 text-right">Počet kliknutí: {counter}</p>
        </div>
    )
}

AdBanner.propTypes = {
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    counter: PropTypes.number
}
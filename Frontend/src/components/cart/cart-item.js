import PropTypes from 'prop-types'

export default function CartItem({name, price, quantity, imageUrl}) {
    return (
        <div className="flex flex-row">
            <div>
                <img url={imageUrl} alt="Obrázok produktu" />
            </div>
            <div className="flex flex-col">
                <div>
                    <span className="text-lg ">Nazov</span>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-600">Cena</span>
                    <span className="text-gray-600">Mnozstvo</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-lg">Celkova cena</span>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string
}
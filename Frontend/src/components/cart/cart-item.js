import PropTypes from 'prop-types'

export default function CartItem({name, price, quantity, imageUrl}) {
    return (
        <div className="flex flex-row items-center justify-center">
            <div className="w-28 h-28">
                <img src={imageUrl} alt="Obrázok produktu" />
            </div>
            <div className="flex flex-col ml-2">
                <div>
                    <span className="text-md ">{name}</span>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-600">{price}€</span>
                    <span className="text-gray-600">{quantity}ks</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center ml-2">
                <span className="text-md text-bold">{price * quantity}€</span>
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
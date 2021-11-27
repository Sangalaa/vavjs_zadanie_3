import PropTypes from 'prop-types'
export default function CartItem({id, name, price, quantity, imageUrl, cartProducts, setCartProducts}) {
    const deleteCartItem = () => {
        const productIndex = cartProducts.findIndex((product => product.id === id))

        console.log(productIndex)

        if(productIndex >= 0) {
            setCartProducts(cartProducts.filter(cartItem => cartItem.id !== id))
        }
    }

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
            <button className="m-4" onClick={deleteCartItem}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}

CartItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string,
    cartProducts: PropTypes.array,
    setCartProducts: PropTypes.func
}
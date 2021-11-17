import PropTypes from 'prop-types'
import CartItem from './cart-item'

export default function Cart({cartProducts}) {
    return (
        <div className="px-4">
            <h2 className="text-2xl text-bold text-center mb-4">Nákupný košík</h2>

            {cartProducts && cartProducts.map((product) => 
                <CartItem
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    imageUrl={product.imageUrl}
                />
            )}
        </div>
    )
}

Cart.propTypes = {
    cartProducts: PropTypes.array
}
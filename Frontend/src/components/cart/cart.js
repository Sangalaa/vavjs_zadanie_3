import PropTypes from 'prop-types'
import CartItem from './cart-item'
import * as ROUTES from '../../constants/routes'

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

            <div className="flex flex-col items-center">
                <a className="ml-4 px-4 py-2 bg-black text-white" href={ROUTES.CHECKOUT}>Zaplatiť</a>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cartProducts: PropTypes.array
}
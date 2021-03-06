import CartItem from './cart-item'
import PropTypes from 'prop-types'
import * as ROUTES from '../../constants/routes'

export default function Cart({cartProducts, setCartProducts}) {
    return (
        <div className="px-4">
            <h2 className="text-2xl text-bold text-center mb-4">Nákupný košík</h2>

            {cartProducts && cartProducts.map((product) => 
                <CartItem
                    key={`cart:${product.id}`}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    imageUrl={product.imageUrl}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    showDeleteButton={true}
                />
            )}

            <h3 className="text-xl text-bold text-center mt-4">
                Celková cena:
                {' ' + cartProducts.reduce((previous, current) => {
                            return previous + current.price * current.quantity
                    }, 0)
                }€
            </h3>

            <div className="flex flex-col items-center mt-4">
                <a className="ml-4 px-4 py-2 bg-black text-white" href={ROUTES.CHECKOUT}>Zaplatiť</a>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cartProducts: PropTypes.array,
    setCartProducts: PropTypes.func
}
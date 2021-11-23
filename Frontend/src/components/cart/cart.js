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

            <h3 className="text-xl text-bold text-center mt-4">
                Celková cena:
                {!cartProducts ?
                    ' ' + 0
                    :
                    ' ' + cartProducts.reduce((previous, current, index) => {
                        if (index === 1) {
                            return previous.price * previous.quantity + current.price * current.quantity
                        }
                        return previous + current.price * current.quantity
                    })
                }€
            </h3>

            <div className="flex flex-col items-center mt-4">
                <a className="ml-4 px-4 py-2 bg-black text-white" href={ROUTES.CHECKOUT}>Zaplatiť</a>
            </div>
        </div>
    )
}
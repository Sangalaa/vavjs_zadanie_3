import PropTypes from 'prop-types'
import { useState } from 'react';

export default function ProductCard({id, name, price, imageUrl, cartProducts, setCartProducts}) {
    const [quantity, setQuantity] = useState(0);

    console.log(cartProducts)

    const handleClick = () => {
        setCartProducts([...cartProducts, {
            id,
            name,
            price,
            quantity,
            imageUrl
        }])
    }

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <article className="p-4 bg-gray-100">
            <div className="w-48 h-48">
                <img
                    src={imageUrl}
                    alt="Obrázok produktu"
                />
            </div>
            <div className="p-2">
                <div>
                    <h2 className="text-xl">{name}</h2>
                    <p className="text-gray-600">{price}€</p>
                </div>
                <div className="flex items-center justify-between">
                    <input className="w-20" type="number" name="count" value={quantity} onChange={handleChangeQuantity} />
                    <button className="ml-4 px-4 py-2 bg-black text-white" onClick={handleClick}>Pridať</button>
                </div>
            </div>
        </article>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    cartProducts: PropTypes.array,
    setCartProducts: PropTypes.func
}
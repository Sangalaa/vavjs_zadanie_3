import PropTypes from 'prop-types'
import { useState } from 'react';

export default function ProductCard({id, name, price, imageUrl, products, setProducts}) {
    const [quantity, setQuantity] = useState(0);

    const handleClick = (e) => {
        setProducts([...products, {
            id,
            name,
            price,
            quantity
        }])
    }

    const handleChangeQuantity = (e) => {
        console.log(e.target.value)
        setQuantity(e.target.value)
    }

    return (
        <article class="p-4 bg-gray-100">
            <div>
                <img
                    url={imageUrl}
                    alt="Obrázok produktu"
                />
            </div>
            <div className="p-2">
                <div>
                    <h2 className="text-xl">Názov</h2>
                    <p className="text-gray-600">Cena</p>
                </div>
                <div className="flex items-center">
                    <input type="number" name="count" value={quantity} onChange={handleChangeQuantity} />
                    <button className="ml-4 px-4 py-2 bg-black text-white" onClick={handleClick}>Pridať</button>
                </div>
            </div>
        </article>
    );
}

ProductCard.propTypes = {
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    products: PropTypes.array,
    setProducts: PropTypes.func
}
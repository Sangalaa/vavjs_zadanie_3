import Header from '../components/header'
import ProductCard  from '../components/product-card';
import Cart from '../components/cart/cart';
import usePersistentState from '../hooks/usePersistentState'
import { fetchJSONData } from '../utils/utils';

import { useState, useEffect } from 'react'

export default function Products() {
    const [cartProducts, setCartProducts] = usePersistentState('cart', [])
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchJSONData('http://localhost:8080/products', 'GET', undefined)
        .then(response => {
            if(response?.success) {
                setProducts(response.data)
            }
        })
    }, []);

    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-8 px-8 flex-grow">
                    {products && products.map(product => 
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.image_link}
                            cartProducts={cartProducts}
                            setCartProducts={setCartProducts}
                        />
                    )}
                </div>
                {cartProducts && cartProducts.length > 0 && <div>
                    <Cart
                        key="cart"
                        cartProducts={cartProducts}
                        setCartProducts={setCartProducts} />
                </div>}
            </div>
        </>
    );
}
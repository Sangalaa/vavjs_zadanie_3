import Header from '../components/header'
import ProductCard  from '../components/product-card';
import Cart from '../components/cart/cart';
import usePersistentState from '../hooks/usePersistentState'

import { useState, useEffect } from 'react'

export default function Products() {
    const [cartProducts, setCartProducts] = usePersistentState('cart', [])
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/products')
        .then(response => response.json())
        .then(response => setProducts(response));
    }, []);

    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-8 px-8 flex-grow">
                    {products && products.map(product => 
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.image_link}
                            cartProducts={cartProducts}
                            setCartProducts={setCartProducts}
                        />
                    )}
                </div>
                <div>
                    <Cart cartProducts={cartProducts} />
                </div>
            </div>
        </>
    );
}
import { useEffect, useState } from 'react';
import Cart from '../components/cart/cart';
import Header from '../components/header';
import ProductCard from '../components/product-card';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { fetchJSONData } from '../utils/utils';


export default function Products() {
    const [cartProducts, setCartProducts] = useLocalStorageState('cart', [])
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchJSONData(`${process.env.REACT_APP_BACKEND_URL}/products`, 'GET', undefined)
            .then(response => {
                if (response?.success) {
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
import Header from '../components/header'
import ProductCard  from '../components/product-card';
import Cart from '../components/cart/cart';

import { useState } from 'react'

export default function Products() {
    // TODO db call
    const products = [
        {
            id: 1,
            name: 'Pearl River EU118-WP-Biela',
            price: 3775,
            imageUrl: 'https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg'
        },
        {
            id: 2,
            name: 'Pearl River EU118-EBN Ebony Polish',
            price: 3775,
            imageUrl: 'https://muzikercdn.com/uploads/products/8612/861208/thumb_4954bfd8.jpg'
        },
        {
            id: 3,
            name: 'Yamaha B2E PE Polished Ebony',
            price: 5369,
            imageUrl: 'https://muzikercdn.com/uploads/products/239/23976/thumb_39a0fe36.jpg'
        }
    ]

    const [cartProducts, setCartProducts] = useState([{
        id: 1,
        name: "Pearl River EU118-WP-Biela",
        price: 3775,
        quantity: 100,
        imageUrl: 'https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg'
    }])

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
                            imageUrl={product.imageUrl}
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
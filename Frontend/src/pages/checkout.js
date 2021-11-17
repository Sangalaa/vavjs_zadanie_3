import CartItem from "../components/cart/cart-item";
import InputField from "../components/forms/input-field";
import Header from "../components/header";
import * as ROUTES from '../constants/routes'

export default function Checkout() {
    const products = [
        {
            id: 1,
            name: 'Pearl River EU118-WP-Biela',
            price: 3775,
            quantity: 10,
            imageUrl: 'https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg'
        },
        {
            id: 2,
            name: 'Pearl River EU118-EBN Ebony Polish',
            price: 3775,
            quantity: 2,
            imageUrl: 'https://muzikercdn.com/uploads/products/8612/861208/thumb_4954bfd8.jpg'
        },
        {
            id: 3,
            name: 'Yamaha B2E PE Polished Ebony',
            price: 5369,
            quantity: 4,
            imageUrl: 'https://muzikercdn.com/uploads/products/239/23976/thumb_39a0fe36.jpg'
        }
    ]

    return (
        <>
        <Header />
        <main className="px-8">
            <article>
                <h1 className="text-4xl text-bold text-center mb-8">Objednávka tovaru</h1>
                <div className="flex flex-row items-start justify-between">
                    <section className="max-w-xl">
                        <h2 className="text-2xl text-bold text-center">Dodacie údaje</h2>

                        <form method="POST" action={ROUTES.CHECKOUT} className="mt-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="col-span-2">
                                    <InputField
                                        name="email"
                                        type="email"
                                        label="Email"
                                    />
                                </div>

                                <InputField
                                    name="name"
                                    type="text"
                                    label="Meno"
                                />

                                <InputField
                                    name="surname"
                                    type="text"
                                    label="Priezvisko"
                                />

                                <InputField
                                    name="street"
                                    type="text"
                                    label="Ulica"
                                />

                                <InputField
                                    name="houseNumber"
                                    type="text"
                                    label="Číslo"
                                />

                                <InputField
                                    name="city"
                                    type="text"
                                    label="Mesto"
                                />

                                <InputField
                                    name="psc"
                                    type="text"
                                    label="PSČ"
                                />
                            </div>
                            <div className="flex flex-col mt-8 items-center">
                                <button className="bg-black text-white px-4 py-3 w-2/6">Objednať</button>
                            </div>
                        </form>
                    </section>
                    <section className="max-w-xl">
                        <h2 className="text-2xl text-bold text-center">Tvoja objednávka</h2>
                        
                        <div className="flex flex-col items-center mt-8">
                            {products && products.map(product => 
                                <CartItem
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                    imageUrl={product.imageUrl}
                                /> 
                            )}
                        </div>

                        <h3 className="text-xl text-bold text-center mt-8">
                            Celková cena: 
                            {!products ? 
                                ' ' + 0 
                                :
                                ' ' + products.reduce((previous, current, index) => {
                                    if(index === 1) {
                                        return previous.price * previous.quantity + current.price * current.quantity
                                    }
                                    return previous + current.price * current.quantity
                                })
                            }€
                        </h3>
                    </section>
                </div>
            </article>
        </main>
        </>
    )
}
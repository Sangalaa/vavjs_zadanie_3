import CartItem from "../components/cart/cart-item";
import InputField from "../components/forms/input-field";
import Header from "../components/header";
import * as ROUTES from '../constants/routes'
import usePersistentState from "../hooks/usePersistentState";

export default function Checkout() {
    const [cartProducts, _] = usePersistentState('cart', [])

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
                                <button type="submit" className="bg-black text-white px-4 py-3 w-2/6">Objednať</button>
                            </div>
                        </form>
                    </section>
                    <section className="max-w-xl">
                        <h2 className="text-2xl text-bold text-center">Tvoja objednávka</h2>
                        
                        <div className="flex flex-col items-center mt-8">
                                {cartProducts && cartProducts.map(product =>
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
                                {!cartProducts ?
                                ' ' + 0 
                                :
                                    ' ' + cartProducts.reduce((previous, current, index) => {
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
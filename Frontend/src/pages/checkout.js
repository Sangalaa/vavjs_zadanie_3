import { useState } from "react";
import CartItem from "../components/cart/cart-item";
import InputField from "../components/forms/input-field";
import Header from "../components/header";
import usePersistentState from "../hooks/usePersistentState";
import { fetchJSONData } from "../utils/utils";
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function Checkout() {
    const navigate = useNavigate()
    const [cartProducts,] = usePersistentState('cart', [])
    const [formErrors, setFormErrors] = useState([]);

    const postData = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target)

        let payload = Object.fromEntries(form.entries())
        const cartData = cartProducts.map(cartItem => ({
            id: cartItem.id,
            quantity: cartItem.quantity
        }))

        payload = { ...payload, cart: cartData }

        const response = await fetchJSONData('http://localhost:8080/checkout', 'POST', JSON.stringify(payload))
            .catch(err => console.log(err))

        if(response.success) {
            navigate(ROUTES.THANK_YOU)
        }
        else {
            setFormErrors(response.errors)
        }
    }

    return (
        <>
            <Header />
            <main className="px-8">
                <article>
                    <h1 className="text-4xl text-bold text-center mb-8">Objednávka tovaru</h1>
                    {cartProducts && cartProducts.length > 0 ? 
                        <div className="flex flex-row items-start justify-between">
                            <section className="max-w-xl">
                                <h2 className="text-2xl text-bold text-center">Dodacie údaje</h2>

                                <form className="mt-8" onSubmit={postData}>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="col-span-2">
                                            <InputField
                                                key="emailInputField"
                                                name="email"
                                                type="email"
                                                label="Email"
                                                error={formErrors.filter(err => err.field === 'email')[0]?.message}
                                                required
                                            />
                                        </div>

                                        <InputField
                                            key="nameInputField"
                                            name="name"
                                            type="text"
                                            label="Meno"
                                            error={formErrors.filter(err => err.field === 'name')[0]?.message}
                                            required
                                        />

                                        <InputField
                                            key="surnameInputField"
                                            name="surname"
                                            type="text"
                                            label="Priezvisko"
                                            error={formErrors.filter(err => err.field === 'surname')[0]?.message}
                                            required
                                        />

                                        <InputField
                                            key="streetInputField"
                                            name="street"
                                            type="text"
                                            label="Ulica"
                                            error={formErrors.filter(err => err.field === 'street')[0]?.message}
                                            required
                                        />

                                        <InputField
                                            key="houseNumberInputField"
                                            name="houseNumber"
                                            type="text"
                                            label="Číslo"
                                            error={formErrors.filter(err => err.field === 'houseNumber')[0]?.message}
                                            required
                                        />

                                        <InputField
                                            key="cityInputField"
                                            name="city"
                                            type="text"
                                            label="Mesto"
                                            error={formErrors.filter(err => err.field === 'city')[0]?.message}
                                            required
                                        />

                                        <InputField
                                            key="pscInputField"
                                            name="psc"
                                            type="text"
                                            label="PSČ"
                                            error={formErrors.filter(err => err.field === 'psc')[0]?.message}
                                            required
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
                                            key={product.id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                        />
                                    )}
                                </div>

                                <h3 className="text-xl text-bold text-center mt-8">
                                    Celková cena:
                                    {' ' + cartProducts.reduce((previous, current) => {
                                        return previous + current.price * current.quantity
                                    }, 0)
                                    }€
                                </h3>
                            </section>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center gap-8">
                            <h2 className="text-4xl text-bold text-center">Váš košík je prázdny</h2>
                            <a className="ml-4 px-4 py-2 bg-black text-white" href={ROUTES.PRODUCTS}>Pokračovať v nákupe</a>
                        </div>
                    }
                </article>
            </main>
        </>
    )
}
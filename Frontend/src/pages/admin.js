import Accordion from "../components/accordion";
import CartItem from "../components/cart/cart-item";
import Header from "../components/header";
import Tab from "../components/tab/tab";
import Tabs from "../components/tab/tabs";
import InputField from "../components/forms/input-field";
import { fetchJSONData } from "../utils/utils";

import { useState, useEffect } from 'react'

export default function Admin() {
    // TODO db call
    const orders = [{
        id: 1,
        name: "Pearl River EU118-WP-Biela",
        price: 3775,
        quantity: 100,
        imageUrl: 'https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg'
    }]

    const user = {
        email: 'email@email.com',
        name: 'Jozko',
        surname: 'Mrkvicka',
        street: 'Nahodna ulica',
        houseNumber: '777',
        city: 'Bratislava',
        psc: '12345'
    }

    const [ads, setAds] = useState([]);
    useEffect(() => {
        fetchJSONData('http://localhost:8080/admin/ads', 'GET', undefined)
        .then(result => {
            console.log(result)
            if(result?.success) {
                setAds(result.data)
            }
        })
    }, []);


    return (
        <>
        <Header />
        <main className="px-8">
            <Tabs>
                <Tab title="Objednávky" className="mt-8">
                    <div className="flex flex-row justify-between">
                        <Accordion
                            title="Title"
                        >
                            <section>
                                <h2 className="text-xl font-medium mb-2">Objednaný tovar</h2>
                                {orders && orders.map(order => (
                                    <>
                                        <CartItem
                                            name={order.name}
                                            price={order.price}
                                            quantity={order.quantity}
                                            imageUrl={order.imageUrl}
                                        />
                                    </>
                                ))}
                                {/* <p className="text-right">Celkom:{
                                    orders ? ' ' + orders.reduce((previous, current, index) => {
                                        if(index === 1) {
                                            return previous.price * previous.quantity + current.price * current.quantity
                                        }
                                        return previous + current.price * current.quantity
                                    })
                                : ' ' + 0}€</p> */}
                            </section>
                            <section>
                                <h2 className="text-xl font-medium my-2">Informácie o používateľovi</h2>
                                {user && 
                                <>
                                    <p>{`${user.name} ${user.surname}`}</p>
                                    <p>{user.email}</p>
                                    <p>{`${user.street} ${user.houseNumber}`}</p>
                                    <p>{`${user.city}, ${user.psc}`}</p>
                                </>
                                }
                            </section>
                        </Accordion>
                        <form method="POST" action="">
                            <button className="px-4 py-2 bg-black text-white" type="submit">Zaplatiť</button>
                        </form>
                    </div>
                </Tab>
                <Tab title="Reklamy" className="mt-8">
                    <section>
                        <h2 class="font-medium text-2xl py-2">Nová reklama</h2>
                        <form method="POST" action="http://localhost:8080/admin/ads" className="grid grid-cols-3 gap-8 py-2">
                                <InputField
                                    name="link"
                                    type="text"
                                    label="Link"
                                />
                                <InputField
                                    name="imageLink"
                                    type="text"
                                    label="Obrázok"
                                />
                                <div className="flex flex-col items-center justify-end">
                                    <button type="submit" className="bg-black text-white p-3 border-2 border-black w-full">Pridať</button>
                                </div>
                        </form>
                    </section>
                    <section className="mt-8">
                            <h2 class="font-medium text-2xl py-2">Reklamy</h2>
                        {ads && ads.map(ad => (
                            <form method="POST" action={`http://localhost:8080/admin/ads`} className="grid grid-cols-4 gap-8 py-2">
                                <InputField
                                    name="link"
                                    type="text"
                                    label="Link"
                                    defaultValue={ad.link}
                                />
                                <InputField
                                    name="imageLink"
                                    type="text"
                                    label="Obrázok"
                                    defaultValue={ad.image_link}
                                />
                                <InputField
                                    name="counter"
                                    type="number"
                                    label="Počítadlo"
                                    min="0"
                                    defaultValue={ad.counter}
                                    disabled
                                />
                                <div className="flex flex-col items-center justify-end">
                                    <button type="submit" className="bg-black text-white p-3 border-2 border-black w-full">Zmeniť</button>
                                </div>
                            </form>
                        ))}
                    </section>
                </Tab>
            </Tabs>
        </main>
        </>
    )
}
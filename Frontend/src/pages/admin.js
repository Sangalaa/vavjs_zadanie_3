import { useEffect, useState } from 'react';
import Accordion from "../components/accordion";
import AddAdForm from '../components/admin/AddAdForm';
import ChangeAdForm from '../components/admin/ChangeAdForm';
import CartItem from "../components/cart/cart-item";
import InputField from "../components/forms/input-field";
import Header from "../components/header";
import Tab from "../components/tab/tab";
import Tabs from "../components/tab/tabs";
import { fetchJSONData } from "../utils/utils";


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
                if (result?.success) {
                    setAds(result.data)
                }
            })
    }, []);

    

    const handleChangeAd = async (e) => {
        e.preventDefault();

        console.log(e.target)

        const form = new FormData(e.target)

        const payload = Object.fromEntries(form.entries());

        const response = await fetchJSONData(e.target.action, 'PUT', JSON.stringify(payload))
            .catch(err => console.log(err))

        if (response.success) {
            const responseAd = response.data[0]

            const adIndex = ads.findIndex((ad => ad.id === responseAd?.id))
            if (adIndex > 0) {
                ads[adIndex].link = responseAd?.link
                ads[adIndex].image_link = responseAd?.image_link
                setAds([...ads])
            }
        }
    }

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
                                    <div>
                                        Celková cena: 
                                    {' ' + orders.reduce((previous, current) => {
                                        return previous + current.price * current.quantity
                                    }, 0)
                                    }€
                                    </div>
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
                            <AddAdForm
                                ads={ads}
                                setAds={setAds}
                            />
                        </section>
                        <section className="mt-8">
                            <h2 class="font-medium text-2xl py-2">Reklamy</h2>
                            {ads && ads.map(ad => (
                                <ChangeAdForm
                                    id={ad.id}
                                    link={ad.link}
                                    image_link={ad.image_link}
                                    counter={ad.counter}
                                    ads={ads}
                                    setAds={setAds}
                                />
                            ))}
                        </section>
                    </Tab>
                </Tabs>
            </main>
        </>
    )
}
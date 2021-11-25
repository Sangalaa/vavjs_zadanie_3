import { useEffect, useState } from 'react';
import AddAdForm from '../components/admin/AddAdForm';
import ChangeAdForm from '../components/admin/ChangeAdForm';
import Order from '../components/admin/Order';
import Header from "../components/header";
import Tab from "../components/tab/tab";
import Tabs from "../components/tab/tabs";
import { fetchJSONData } from "../utils/utils";


export default function Admin() {
    const [ads, setAds] = useState([]);
    useEffect(() => {
        fetchJSONData('http://localhost:8080/admin/ads', 'GET', undefined)
            .then(result => {
                if (result?.success) {
                    setAds(result.data)
                }
            })
    }, []);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetchJSONData('http://localhost:8080/admin/orders', 'GET', undefined)
        .then(result => {
            if(result?.success) {
                setOrders(result.data)
            }
        })
    }, [])

    return (
        <>
            <Header />
            <main className="px-8">
                <Tabs>
                    <Tab title="Objednávky" className="mt-8 space-y-4">
                        {orders && orders.map(order => <Order
                            order={order}
                            user={{
                                name: order.user.firstName,
                                surname: order.user.lastName,
                                email: order.user.email,
                                street: order.street,
                                houseNumber: order.houseNumber,
                                city: order.city,
                                psc: order.psc
                            }}
                        />)}
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
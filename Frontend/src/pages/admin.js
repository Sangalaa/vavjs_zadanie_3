import Accordion from "../components/accordion";
import CartItem from "../components/cart/cart-item";
import Header from "../components/header";

export default function Admin() {
    // DB call
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

    return (
        <>
        <Header />
        <main className="px-8">
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
        </main>
        </>
    )
}
import { useState } from 'react'
import Accordion from '../accordion'
import CartItem from '../cart/cart-item'
import { fetchJSONData } from '../../utils/utils'

export default function Order({order, user}) {
    const [paid, setPaid] = useState(order.status === 'paid')

    const payOrder = () => {
        fetchJSONData(`http://localhost:8080/admin/orders/${order.id}`, 'PUT', undefined)
        .then(result => {
            if(result.success) {
                setPaid(true)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="flex flex-row items-center justify-between">
            <Accordion
                title="Title"
            >
                <section>
                    <h2 className="text-xl font-medium mb-2">Objednaný tovar</h2>
                    {order.order_items.map(order_item => (
                        <>
                            <CartItem
                                name={order_item.product.name}
                                price={order_item.price}
                                quantity={order_item.quantity}
                                imageUrl={order_item.product.image_link}
                            />
                        </>
                    ))}
                    <div>
                        Celková cena:
                        {' ' + order.order_items.reduce((previous, current) => {
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
            <div>
                <button className={"px-4 py-2 text-white " + (paid ? "bg-gray-500" : "bg-black")} disabled={paid} type="submit" onClick={payOrder}>Zaplatiť</button>
            </div>
        </div>
    )
}
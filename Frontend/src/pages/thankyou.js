import { useEffect, useState } from 'react'
import AdBanner from '../components/ad-banner'
import Header from '../components/header'
import { fetchJSONData } from '../utils/utils'
import usePersistentState from '../hooks/usePersistentState'

export default function ThankYou() {
    const [ad, setAd] = useState();
    const [, setCart] = usePersistentState('cart', []);

    useEffect(() => {
        setCart([])
    }, [setCart])

    useEffect(() => {
        fetchJSONData(`${process.env.REACT_APP_BACKEND_URL}/ads`, 'GET', undefined)
        .then(result => {
            if(result.success) {
                if(result.data.length > 0) {
                    setAd(result.data[0])
                }
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        <Header />

        <main className="px-8">
            <div>
                    {ad && <AdBanner
                        imageUrl={ad.image_link}
                        link={`${process.env.REACT_APP_BACKEND_URL}/ads/${ad.id}`}
                        counter={ad.counter}
                    />}
                <h1 className="text-4xl text-bold text-center mt-8">Ďakujeme za objednávku</h1>
            </div>
        </main>
        </>
    )
}
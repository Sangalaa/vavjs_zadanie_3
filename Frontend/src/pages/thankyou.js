import PropTypes from 'prop-types'
import AdBanner from '../components/ad-banner'
import Header from '../components/header'

export default function ThankYou() {
    // DB call

    return (
        <>
        <Header />

        <main className="px-8">
            <div>
                <AdBanner
                    imageUrl='https://muzikercdn.com/uploads/products/6397/639786/thumb_2870d1bf.jpg'
                    link='https://www.google.sk'
                    counter={10}
                />
                <h1 className="text-4xl text-bold text-center mt-8">Ďakujeme za objednávku</h1>
            </div>
        </main>
        </>
    )
}
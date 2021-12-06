import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from '../forms/input-field'
import { fetchJSONData } from '../../utils/utils'

export default function ChangeAdForm({id, link, image_link, counter, ads, setAds}) {
    const [errors, setErrors] = useState([])

    const [linkValue, setLinkValue] = useState(link)
    const [imageLinkValue, setImageLinkValue] = useState(image_link)
    const [counterValue, setCounterValue] = useState(counter);

    const handleChangeAd = async (e) => {
        const payload = {
            link: linkValue,
            image_link: imageLinkValue
        }

        const response = await fetchJSONData(`${process.env.REACT_APP_BACKEND_URL}/admin/ads/${id}`, 'PUT', JSON.stringify(payload))
            .catch(err => console.log(err))

        if(!response.success) {
            setErrors(response.errors)
        }
        else {
            const ad = response.data[0];
            setLinkValue(ad?.link);
            setImageLinkValue(ad?.image_link);
            setCounterValue(ad?.counter);
        }
    }

    const handleDeleteAd = async (e) => {
        const response = await fetchJSONData(`${process.env.REACT_APP_BACKEND_URL}/admin/ads/${id}`, 'DELETE', undefined)
            .catch(err => console.log(err))

        if(response.success) {
            setAds(ads.filter(ad => ad.id !== id))
        }
        else {
            setErrors(response.errors)
        }
    }


    return (
        <div className="grid grid-cols-5 gap-8 py-2">
            <InputField
                key={`changeAdLink:${id}`}
                name="link"
                type="text"
                label="Link"
                defaultValue={link}
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                required
                error={errors.filter(err => err.field === 'link')[0]?.message}
            />
            <InputField
                key={`changeAdImageLink:${id}`}
                name="image_link"
                type="text"
                label="Obrázok"
                defaultValue={image_link}
                value={imageLinkValue}
                onChange={(e) => setImageLinkValue(e.target.value)}
                required
                error={errors.filter(err => err.field === 'image_link')[0]?.message}
            />
            <InputField
                key={`changeAdCounter:${id}`}
                name="counter"
                type="number"
                label="Počítadlo"
                min="0"
                value={counterValue}
                disabled
                required
                error={errors.filter(err => err.field === 'counter')[0]?.message}
            />
            <div className={errors.length === 0 ? `flex flex-col items-center justify-end` : `flex flex-col items-center justify-center`}>
                <button className="bg-black text-white p-3 border-2 border-black w-full mt-2" onClick={handleChangeAd}>Zmeniť</button>
            </div>
            <div className={errors.length === 0 ? `flex flex-col items-center justify-end` : `flex flex-col items-center justify-center`}>
                <button className="bg-black text-white p-3 border-2 border-black w-full mt-2" onClick={handleDeleteAd}>Vymazat</button>
            </div>
        </div>
    )
}

ChangeAdForm.propTypes = {
    id: PropTypes.string,
    link: PropTypes.string,
    image_link: PropTypes.string,
    couter: PropTypes.number,
    ads: PropTypes.array,
    setAds: PropTypes.func
}
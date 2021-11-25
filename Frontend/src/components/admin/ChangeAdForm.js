import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from '../forms/input-field'
import { fetchJSONData } from '../../utils/utils'

export default function ChangeAdForm({id, link, image_link, counter, ads, setAds}) {
    const [errors, setErrors] = useState([])

    const [linkValue, setLinkValue] = useState(link)
    const [imageLinkValue, setImageLinkValue] = useState(image_link)

    const handleChangeAd = async (e) => {
        const payload = {
            link: linkValue,
            image_link: imageLinkValue
        }

        const response = await fetchJSONData(`http://localhost:8080/admin/ads/${id}`, 'PUT', JSON.stringify(payload))
            .catch(err => console.log(err))

        if(!response.success) {
            setErrors(response.errors)
        }
    }

    const handleDeleteAd = async (e) => {
        const response = await fetchJSONData(`http://localhost:8080/admin/ads/${id}`, 'DELETE', undefined)
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
                name="counter"
                type="number"
                label="Počítadlo"
                min="0"
                defaultValue={counter}
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
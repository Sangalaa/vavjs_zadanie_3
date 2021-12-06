import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from '../forms/input-field';
import { fetchJSONData } from '../../utils/utils';

export default function AddAdForm({ads, setAds}) {
    const [addAdFormErrors, setAddAdFormErrors] = useState([]);

    const addNewAd = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target)

        const payload = Object.fromEntries(form.entries());

        const response = await fetchJSONData(e.target.action, 'POST', JSON.stringify(payload))
            .catch(err => console.log(err))

        if (response.success) {
            e.target.reset()

            const ad = response.data[0]

            setAds([...ads, {
                id: ad?.id,
                counter: ad?.counter,
                link: ad?.link,
                image_link: ad?.image_link
            }])
        }
        else {
            setAddAdFormErrors(response.errors)
        }
    }

    return (
        <form method="POST" action={`${process.env.REACT_APP_BACKEND_URL}/admin/ads`} className="grid grid-cols-3 gap-8 py-2" onSubmit={addNewAd}>
            <InputField
                key="addAdLinkInputField"
                name="link"
                type="text"
                label="Link"
                required
                error={addAdFormErrors.filter(err => err.field === 'link')[0]?.message}
            />
            <InputField
                key="addAdImageLinkInputField"
                name="image_link"
                type="text"
                label="Obrázok"
                required
                error={addAdFormErrors.filter(err => err.field === 'image_link')[0]?.message}
            />
            <div className={addAdFormErrors.length === 0 ? `flex flex-col items-center justify-end` : `flex flex-col items-center justify-center`}>
                <button type="submit" className="bg-black text-white p-3 border-2 border-black w-full mt-2">Pridať</button>
            </div>
        </form>
    );
}

AddAdForm.propTypes = {
    ads: PropTypes.array,
    setAds: PropTypes.func
}
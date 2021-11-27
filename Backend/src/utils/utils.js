const validateEmail = (email) => {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email.toLowerCase())
}

const validateName = (name) => {
    const nameRegex = /^[A-Z][a-z]{1,}$/
    return nameRegex.test(name)
}

const validateSurname = (surname) => {
    const surnameRegex = /^[A-Z][a-z]{1,}$/
    return surnameRegex.test(surname)
}

const validateStreet = (street) => {
    const streetRegex = /^[A-Z][a-z]{1,}$/
    return streetRegex.test(street)
}

const validateHouseNumber = (houseNumber) => {
    const houseNumberRegex = /^[A-Za-z0-9/]{1,}$/
    return houseNumberRegex.test(houseNumber)
}

const validateCity = (city) => {
    const cityRegex = /^[A-Z][a-z]{1,}$/
    return cityRegex.test(city)
}

const validatePsc = (psc) => {
    const pscRegex = /^[0-9]{5}$/
    return pscRegex.test(psc)
}

const validateImageURL = (url) => {
    const urlRegex = /\.(jpeg|jpg|gif|png)$/;
    return urlRegex.test(url);
}

const validateCart = (cart) => {
    if(!cart || !Array.isArray(cart)) {
        return false
    }

    return cart.every(cartItem => 'id' in cartItem && 'quantity' in cartItem && cartItem.quantity > 0)
}

module.exports = {
    validateEmail,
    validateName,
    validateSurname,
    validateStreet,
    validateHouseNumber,
    validateCity,
    validatePsc,
    validateImageURL,
    validateCart
}
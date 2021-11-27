export const fetchJSONData = (route, method, body) => {
    return fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(checkCorrectMIMEType)
}

export const checkCorrectMIMEType = (result) => {
    if (result.redirected) {
        window.location.href = result.url
        return
    }

    return new Promise((resolve, reject) => {
        const contentType = result.headers.get('Content-Type')
        if (contentType?.indexOf('application/json') !== -1) {
            resolve(result.json())
        }
        else {
            reject(`Unsupported Content-Type ${contentType}`)
        }
    })
}
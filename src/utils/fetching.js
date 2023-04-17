/**
 * Fetch all objects without Authentication
 * @param {*} url API Server URL
 * @returns objects as json
 */
export const getAll = url => fetch(url).then(res => res.json());

/**
 * Fetch all objects with Authentication
 * @param {*} url API Server URL
 * @param {*} token Authentication
 * @returns objects as json
 */
export const getAllWithAuth = (url, token) => fetch(url, {
    'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then( res => res.json());

/**
 * Delete an object through API
 * @param {*} url API Server URL
 * @param {*} token Authentication
 * @returns result of DELETE method
 */
// export const deleting = (url, token) => fetch(url, {
export const deleting = (url) => fetch(url, {
    'method': 'DELETE',
    'headers': {
        // 'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
});

/**
 * Create a new object through API
 * @param {*} url API Server URL
 * @param {*} token Authentication
 * @param {*} data a new object
 * @returns result of POST method
 */
// export const adding = (url, token, data) => fetch(url, {
export const adding = (url, data) => fetch(url, {
    'method': 'POST',
    'headers': {
    //     'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
});

/**
 * Update an object through API
 * @param {*} url API Server API
 * @param {*} token Authentication
 * @param {*} data the updated object
 * @returns result of PUT method
 */
// export const updating = (url, token, data) => fetch(url, {
export const updating = (url, data) => fetch(url, {
    'method': 'PUT',
    'headers': {
    //     'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
});
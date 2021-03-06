export const getAll = url => fetch(url).then(res => res.json());

export const getAllWithAuth = (url, token) => fetch(url, {
    'headers': {
        'Authorization': 'Bearer ' + token
    }
}).then( res => res.json());

export const deleting = (url, token) => fetch(url, {
    'method': 'DELETE',
    'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
}).then( res => res.json());

export const adding = (url, token, data) => fetch(url, {
    'method': 'POST',
    'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
}).then( res => res.json());

export const updating = (url, token, data) => fetch(url, {
    'method': 'PUT',
    'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
}).then( res => res.json());
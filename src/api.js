const API_URL = "https://desafio-backend-o9nm.onrender.com"


export function dataValidation(data){

    return fetch(`${API_URL}/auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    
}
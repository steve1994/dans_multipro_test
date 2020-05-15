const API_URL = 'http://localhost:3001';

export const fetchPositions = async() => {
    let response = await fetch(`${API_URL}/api/datas`);
    let data = await response.json();
    return data;
}

export const fetchPositionsWithFilters = async(description,location,fullTime) => {
    let response = await fetch(`${API_URL}/api/datas?description=${description}&location=${location}&full_time=${fullTime}`);
    let data = await response.json();
    return data
}

export const fetchPositionById = async(id) => {
    let response = await fetch(`${API_URL}/api/datas/${id}`);
    let data = await response.json();
    return data
}

export const submitRegister = async(username,password) => {
    let dataPayload = {username,password};
    let response = await fetch(`${API_URL}/api/users/register`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(dataPayload)
    });
    let data = await response.json();
    return data;
}

export const submitLogin = async(username,password) => {
    let dataPayload = {username,password};
    let response = await fetch(`${API_URL}/api/users/login`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(dataPayload)
    });
    let data = await response.json();
    return data;
}

export const verifyToken = async(token) => {
    let dataPayload = {token};
    let response = await fetch(`${API_URL}/api/users/verify`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(dataPayload)
    });
    let data = await response.json();
    return data;
}

export const verifyLogout = async(token) => {
    let dataPayload = {token};
    let response = await fetch(`${API_URL}/api/users/logout`,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(dataPayload)
    });
    let data = await response.json();
    return data;
}

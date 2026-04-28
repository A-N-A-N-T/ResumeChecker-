import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


export const register = async ({username,email,password}) => {
     try {
        const response = await api.post('user/Auth/register',{
            username,email,password
        })
        return response.data
     } catch (error) {
        console.log(error)
     }
}

export const login = async ({email,password}) => {
    try {
        const response = await api.post('user/Auth/login',{
            email,password
        })
        console.log(response.data)
        return response.data
    } catch (error) {
       console.log(error) 
    }
}


export const logout = async () => {
    try {
        const response = await api.get('user/Auth/logout')
        return response.data
    } catch (error) {
       console.log(error) 
    }
}


export const getMe = async () => {
    try {
        const response = await api.get('user/Auth/getMe')
        return response.data
    } catch (error) {
       console.log(error) 
    }
}




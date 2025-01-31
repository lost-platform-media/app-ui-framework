import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_DEV,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const encodedCredentials = btoa('marcel.verbeek:Topstar364!');
        if (encodedCredentials) {
            config.headers.Authorization = `Basic ${encodedCredentials}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getData = async (endpoint: string, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('Error with GET request:', error);
        throw error;
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error with POST request:', error);
        throw error;
    }
};

export const putData = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error with PUT request:', error);
        throw error;
    }
};

export const deleteData = async (endpoint: string) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error with DELETE request:', error);
        throw error;
    }
};

export default apiClient;
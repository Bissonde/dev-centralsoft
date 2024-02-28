import axios from 'axios';
// axios.defaults.baseURL = 'https://bissonde.ao/api/'
axios.defaults.baseURL = 'https://localhost:7127/api/'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(config => {
    const authToken = localStorage.getItem('JwtToken');
    if(authToken){
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
})

axios.interceptors.response.use(response => response, async error => {
    if(error.response.status === 401)
    {
        const {status, data} = await axios.post('Account', {}, {
            withCredentials:true
        });

        if(status === 200)
        {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.JwtToken}`;
            return axios(error.config);
        }

        if (status === 400) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.JwtToken}`;
            return axios(error.config);
        }
    }

    return error;
})
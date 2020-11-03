import axios from 'axios';

export function dataGetterFromApi(url){    
    return axios({
        'method':'GET',
        'url':url
    });
}

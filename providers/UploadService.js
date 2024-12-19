import { ACCESS_TOKEN } from '@/helpers/constant';
import axios from 'axios';


export default class UploadService {
    static upload(path, data, onUploadProgress, cancelToken) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        return axios.post(path, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
            onUploadProgress,
            cancelToken,
        });
    }

    // static getAuthHeader() {
    //     const accessToken = localStorage.getItem(ACCESS_TOKEN);
    //     return {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     };
    // }

    // static changeProductStatus(email, status) {
    //     return axios.post(`${URL.UPDATE_PRODUCT_STATUS}/${email}?status=${status}`)
    // }
}

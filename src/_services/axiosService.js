//导入axios
import axios from 'axios'
//定义主机，定义别的主机可能会报跨域错误
const API_URL = "";

//定义并且曝光出一个类
export class AxiosService {
    constructor() {
    }


    /**
     * 发送post请求
     *
     * @param path 请求路径，格式为 /x/b;
     * @param paramBody 请求参数消息体
     * @returns {Promise<AxiosResponse<T> | never>} 请求得到的数据
     */
    post(path, paramBody) {
        const url = API_URL + path;
        return axios.post(url, paramBody).then(resp => resp.data);
    }

    /**
     *发送get请求
     *
     * @param path 请求路径，格式为/x/y | /x/y:id | /x/y?a=1&b=2
     * @returns {Promise<AxiosResponse<T> | never>} 请求得到的结果数据
     */
    get(path) {
        const url = API_URL + path;
        return axios.get(url).then((resp) => resp.data);
    }
}
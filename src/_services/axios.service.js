//导入axios
import axios from 'axios'
import {authHeader} from "../_helpers";
import {apiEnv} from "../_helpers/env";
// 定义主机，定义别的主机可能会报跨域错误
let apiEnvStr = localStorage.getItem(apiEnv.key);
// default is express
apiEnvStr = apiEnvStr ? apiEnvStr : apiEnv.express;

axios.interceptors.request.use(function (config) {
    if (authHeader().Authorization) {
        config.headers['Authorization'] = authHeader().Authorization;
    }
    config.baseURL = "/api/" + apiEnvStr;
    return config;
}, (err => {
    return Promise.reject(err);
}));

//定义并且曝光出一个类
export class AxiosService {
    constructor() {
    }

    /**
     * 发送post请求
     *
     * @param path 请求路径，格式为 /x/b;
     * @param paramBody 请求参数消息体
     */
    post(path, paramBody) {
        return axios.post(path, paramBody).then(resp => resp.data);
    }

    /**
     *发送get请求
     *
     * @param path 请求路径，格式为/x/y | /x/y:id | /x/y?a=1&b=2
     */
    get(path) {
        return axios.get(path).then((resp) => resp.data);
    }

    /**
     * 发送put请求
     *
     * @param path 请求路径，格式为 /x/b;
     * @param paramBody 请求参数消息体
     */
    put(path, paramBody) {
        return axios.put(path, paramBody).then(resp => resp.data);
    }

    /**
     * 删除
     *
     * @param path 请求路径，格式为 /x/b;
     * @returns
     */
    delete(path) {
        return axios.delete(path).then(resp => resp.data);
    }
}
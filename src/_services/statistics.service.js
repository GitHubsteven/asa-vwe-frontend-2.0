//导入axiosService
import {AxiosService} from "./axios.service.js";
import {statistics} from "../_helpers/vwe-url";

let axiosService = new AxiosService();


//定义并且曝光出一个类
export class StatisticsService {
    constructor() {
    }

    /**
     * 获取blog按类别分类
     *
     * @returns {Promise<*>}
     */
    blogByCategory() {
        return axiosService.get(statistics.prefix + statistics.blogByCategory);
    }

}
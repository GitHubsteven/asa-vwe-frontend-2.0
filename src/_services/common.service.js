import {AxiosService} from "./axios.service.js";
import {common} from "../_helpers/vwe-url";

let axiosService = new AxiosService();

export class CommonService {
    settings() {
        return axiosService.get(common.prefix + common.setting);
    }
}
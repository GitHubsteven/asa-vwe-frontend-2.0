//导入axiosService
import {AxiosService} from "./axios.service.js";
import {categories} from "../_helpers/vwe-url";

let axiosService = new AxiosService();


//定义并且曝光出一个类
export class CategoryService {
    constructor() {
    }

//定义一个方法查询
    listCategories() {
        return axiosService.get(categories.prefix + categories.list);
    }

    //查询
    viewCategory(id) {
        let url = (categories.prefix + categories.getById).replace(":id", id);
        return axiosService.get(url);
    }

    //插入
    createCategory(category) {
        let userJson = localStorage.getItem("user");
        if (userJson) {
            let user = JSON.parse(userJson);
            category.creator = user.username;
            category.modifier = user.username;
        }
        return axiosService.post(categories.prefix + categories.create, category);
    }

    //删除，调用delete表示删除数据
    delCategory(id) {
        let url = (categories.prefix + categories.delete).replace(":id", id);
        return axiosService.delete(url);
    }

    //更新，调用put方法，表示修改数据
    update(category) {
        let url = (categories.prefix + categories.update).replace(":id", category._id);
        return axiosService.put(url, category);
    }

    getUserName() {
        let userJson = localStorage.getItem("user");
        if (userJson) {
            let user = JSON.parse(userJson);
            return user.name;
        }
        return null;
    }
}
//导入axiosService
import {AxiosService} from "./axios.service.js";
import {blogs} from "../_helpers/vwe-url";

let axiosService = new AxiosService();


//定义并且曝光出一个类
export class BlogService {
    constructor() {
    }

//定义一个方法查询
    listBlogs(searchOpt) {
        return axiosService.post(blogs.prefix + blogs.list, searchOpt);
    }

    //查询
    viewBlog(id) {
        let url = (blogs.prefix + blogs.getById).replace(":id", id);
        return axiosService.get(url);
    }

    //插入
    createBlog(blog) {
        let userJson = localStorage.getItem("user");
        if (userJson) {
            let user = JSON.parse(userJson);
            blog.author = user.username;
        }
        return axiosService.post(blogs.prefix + blogs.create, blog);
    }

    //删除，调用delete表示删除数据
    delBlog(id) {
        let url = (blogs.prefix + blogs.delete).replace(":id", id);
        return axiosService.delete(url);
    }

    //更新，调用put方法，表示修改数据
    update(blog) {
        let url = (blogs.prefix + blogs.update).replace(":id", blog._id);
        return axiosService.put(url, blog);
    }

    getUserName() {
        let userJson = localStorage.getItem("user");
        if (userJson) {
            let user = JSON.parse(userJson);
            blog.author = user.username;
        }
    }
}
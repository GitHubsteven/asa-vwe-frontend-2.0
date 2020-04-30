//导入axiosService
import {AxiosService} from "./axios.service.js";
//定义主机，定义别的主机可能会报跨域错误
const API_URL = "/api";

let axiosService = new AxiosService();


//定义并且曝光出一个类
export class BlogService {
    constructor() {
    }

//定义一个方法查询
    getBlogs(searchOpt) {
        const url = '/blog-list';
        return axiosService.post(url, searchOpt);
    }

    listBlogs(searchOpt) {
        const url = '/blog/list';
        return axiosService.post(url, searchOpt);
    }

    //查询
    viewBlog(id) {
        const url = `/blog-view/${id}`;
        return axiosService.get(url);
    }

    //插入
    createBlog(blog) {
        let url = `/blog-create/`;
        return axiosService.post(url, blog);
    }

    //删除，调用delete表示删除数据
    delBlog(id) {
        let url = `/blog-delete/${id}`;
        return axiosService.delete(url);
    }

    //更新，调用put方法，表示修改数据
    update(blog) {
        let url = `/blog-update/${blog._id}`;
        return axiosService.put(url, blog);
    }
}
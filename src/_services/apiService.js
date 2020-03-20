//导入axios
import axios from 'axios'
//定义主机，定义别的主机可能会报跨域错误
const API_URL = "http://localhost:8090";

//定义并且曝光出一个类
export class ApiService {
  constructor() {
  }

//定义一个方法查询
  getBlogs(searchOpt) {
    const url = `${API_URL}/blog/list`;
    return axios.post(url, searchOpt).then((res) => res.data);
  }

  listBlogs(searchOpt) {
    const url = `${API_URL}/api/blog/list`;
    return axios.post(url, searchOpt).then((res) => res.data);
  }

  //查询
  viewBlog(id) {
    const url = `${API_URL}/blog-view/${id}`;
    return axios.get(url).then((res) => res.data);
  }

  //插入
  createBlog(blog) {
    let url = `${API_URL}/blog-create/`;
    return axios.post(url, blog).then((res) => res.data);
  }

  //删除，调用delete表示删除数据
  delBlog(id) {
    let url = `${API_URL}/blog-delete/${id}`;
    return axios.delete(url);
  }

  //更新，调用put方法，表示修改数据
  update(blog) {
    let url = `${API_URL}/blog-update/${blog._id}`;
    return axios.put(url, blog).then((res) => res.data)
  }
}
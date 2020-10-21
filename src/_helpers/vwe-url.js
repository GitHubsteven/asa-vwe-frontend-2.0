export {blogs, users, prefix, categories, common, statistics};

let prefix = {
    blogs: "/blogs",
    users: "/users",
    categories: "/categories",
    common: "/common"
};

let blogs = {
    prefix: "/blogs",
    list: "/list",
    getById: "/:id",
    update: "/:id",
    delete: "/:id",
    create: "/"
};

let users = {
    prefix: "/users",
    authenticate: "/authenticate",
    register: "/register",
    getAll: "/",
    current: "/current",
    getById: "/:id",
    update: "/:id",
    delete: "/:id"
};

let categories = {
    prefix: "/categories",
    list: "/",
    getById: "/:id",
    update: "/:id",
    delete: "/:id",
    create: "/"
};

let common = {
    prefix: "/common",
    setting: "/setting"
};

let statistics = {
    prefix: "/statistics",
    blogByCategory: "/blogByCategory",
    blogByTag: "/blogByTag",
    blogByCreateTime: "/blogByCreateTime"
};

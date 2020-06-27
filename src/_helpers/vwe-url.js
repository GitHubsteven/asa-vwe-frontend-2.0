export {blogs, users, prefix, categories};

let prefix = {
    blogs: "/blogs",
    users: "/users",
    categories: "/categories"
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
    list: "/list",
    getById: "/:id",
    update: "/:id",
    delete: "/:id",
    create: "/"
};

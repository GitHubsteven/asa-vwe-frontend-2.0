export {blogs, users, prefix};
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

let prefix = {
    blogs: "/blogs",
    users: "/users"
};
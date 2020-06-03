<template>
    <div style="margin-top: 1%">
        <el-row>
            <el-col :span="20" :offset="1">
                <el-row>
                    <el-col :span="3">
                        <div>
                            <router-link to="/blog-add">
                                <el-button type="primary">Add</el-button>
                            </router-link>
                        </div>
                    </el-col>

                    <el-col :span="5" :offset="11">
                        <div>
                            <el-input placeholder="input content" v-model="searchers.title">
                                <template slot="prepend">title</template>
                                <el-button slot="append" icon="el-icon-search" @click="searchBlogs()"></el-button>
                            </el-input>
                        </div>
                    </el-col>

                </el-row>

                <div class="grid-content bg-purple-light">
                    <div v-for="blog in blogs" v-bind:key="blog.id">
                        <el-card class="box-card" body-style="{ padding: '10px',margin-top:10px }">
                            <div slot="header" class="clearfix">
                                <el-link type="primary" @click="detail(blog)">{{blog.title}}</el-link>
                                <el-button v-show="state" style="float: right; padding: 3px 2px;color: red" type="text"
                                           @click="del(blog)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-button v-show="state" style="float: right; padding: 3px 2px;" type="text"
                                           @click="update(blog)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                            </div>
                            <div class="text item">
                                {{createSyllabus(blog.context)}}
                            </div>
                            <div class="text item">
                                <el-tag type="info">test</el-tag>
                                <el-tag type="info">{{blog.author}}</el-tag>
                                <el-tag type="info">{{blog.createTime}}</el-tag>
                            </div>
                        </el-card>
                    </div>
                </div>
                <el-row style="margin-top: 0.5%">
                    <el-col :span="5" :offset="13">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="searchers.curPage"
                                :page-sizes="[10, 20, 50]"
                                :page-size="searchers.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    //引入接口辅助类
    import {BlogService} from "../../_services/blog.service";
    import {ConvertService} from "../../_services/convert.service";
    import {mapState} from "vuex";


    //定义一个对象
    const apiService = new BlogService();
    let convertService = new ConvertService();

    export default {
        name: "blog-list",
        data() {
            return {
                blogs: [],
                count: 0,
                searchers: {
                    title: null,
                    curPage: 1,
                    pageSize: 10
                }
            }
        },
        //定义方法
        methods: {
            getBlogs(searchOpt) {
                //调用接口获取数据，并且更新vue页面数据
                apiService.listBlogs(searchOpt).then((resp) => {
                    this.blogs = resp.items;
                    this.count = resp.count;
                });
            },
            /**
             * 生成摘要
             * @param markdown
             * @returns {string}
             */
            createSyllabus(markdown) {
                let wrapper = document.createElement("div");
                wrapper.innerHTML = convertService.makeHtml(markdown);
                let text = wrapper.innerText;
                let limit = text.length < 100 ? text.length : 100;
                return text.substr(0, limit) + "...";
            },
            /**
             * 博客详情
             *
             * @param blog
             */
            detail(blog) {
                this.$router.push({
                    path: '/blog-view',
                    name: 'BlogView',
                    query: {
                        blogId: blog._id
                    }
                })
            },
            /**
             * 删除博客
             * @param blog
             */
            del(blog) {
                this.$confirm('确定要删除这条博客吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiService.delBlog(blog._id).then(resp => {
                        if (resp) {
                            this.getBlogs();
                        } else {
                            window.alert("blank resp");
                        }
                    })
                }).catch(() => {
                    //console.log("cancel the confirm")
                });
            },
            update(blog) {
                this.$router.push({
                    path: "/blog-update",
                    name: "BlogUpdate",
                    query: {
                        blogId: blog._id
                    }
                })
            },
            handleSizeChange(val) {
                this.searchers.pageSize = val;
                this.searchBlogs();
            },
            handleCurrentChange(val) {
                this.searchers.curPage = val;
                this.searchBlogs();
            },
            searchBlogs() {
                this.getBlogs(this.searchers);
            }
        },
        //在vue被渲染的时候调用方法
        mounted() {
            this.getBlogs(this.searchers);
        },
        computed: {
            ...mapState({
                status: state => state.account.status,
            })
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 79%;
        margin-top: 10px;
    }
</style>
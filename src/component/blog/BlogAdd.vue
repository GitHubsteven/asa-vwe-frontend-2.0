<template>
    <div>
        <el-row>
            <el-col :span="23" :offset="1">
                <div>
                    <el-input placeholder="名称" v-model="blog.title">
                        <template slot="prepend">名称</template>
                    </el-input>
                </div>
                <div style="margin-top: 10px">
                    <el-button icon="el-icon-edit" size="mini" @click="onlyEditor()"></el-button>
                    <el-button icon="el-icon-view" size="mini" @click="onlyShower()"></el-button>
                    <el-button icon="el-icon-reading" size="mini" @click="editorAndShower()"></el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="layout.editor_span" :offset="layout.editor_offset" id="editor" v-show="editable">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="blog.context"
                        maxlength="3000"
                        show-word-limit
                        :autosize="{ minRows: 50, maxRows: 300 }"
                >
                </el-input>
            </el-col>
            <el-col :span="layout.shower_span" :offset="layout.editor_offset" id="shower" v-show="visual">
                <el-input
                        type="textarea"
                        v-html="convertMarkdown(blog.context)"
                        maxlength="3000"
                        show-word-limit
                        :autosize="{ minRows: 50, maxRows: 300 }"
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="23" :offset="1">
                <el-button type="primary" v-if="!blog._id" @click="create()">Create</el-button>
                <el-button type="primary" v-if="blog._id" @click="update()">Update</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {BlogService} from "../../_services/blog.service";
    import {ConvertService} from "../../_services/convert.service";
    // es modules
    import Editor from '@tinymce/tinymce-vue';

    let convertService = new ConvertService();
    let blogService = new BlogService();

    let blogTmp = {};
    export default {
        name: "blog-add",
        components: {
            'editor': Editor
        },
        data: function () {
            return {
                blog: {
                    title: null,
                    context: null,
                    author: "asa.x",
                    createTime: new Date(),
                    id: null
                },
                editable: true,
                visual: false,
                layout: {
                    editor_span: 20,
                    editor_offset: 1,
                    shower_span: 10,
                    shower_offset: 1
                }
            }
        },
        methods: {
            create() {
                blogService.createBlog(this.blog).then(res => {
                    if (!res._id) {
                        window.alert("res:" + res.message);
                    } else {
                        //页面跳转
                        this.$router.push({
                            path: '/blog-list',
                            name: 'BlogList'
                        })
                    }
                })
            },
            convertMarkdown(context) {
                return convertService.makeHtml(context);
            },

            init() {
                let blog = this.$route.query.blog;
                if (blog) {
                    blogTmp = blog;
                    Object.assign(this.blog, blog);
                    return;
                }
                this.layout.editor_span = 20;
                this.layout.shower_span = 0;
            },
            update() {
                let oldBlog = blogTmp;
                if (oldBlog.title === this.blog.title
                  && oldBlog.context === this.blog.context
                  && oldBlog.author === this.blog.author) {
                    window.alert("there is no change!");
                    return;
                }
                blogService.update(this.blog).then((resp) => {
                    if (!resp) {
                        window.alert("update failed!");
                    }
                    this.$router.push({
                        path: '/blog-view',
                        name: 'BlogView',
                        query: {
                            blogId: oldBlog._id
                        }
                    })
                }, (error) => {
                    console.log(error);
                    window.alert("update failed!");
                });
            },
            onlyEditor() {
                this.editable = true;
                this.layout.editor_span = 20;
                this.layout.shower_span = 0;
                this.visual = false;
            },
            onlyShower() {
                this.editable = false;
                this.visual = true;
                this.layout.editor_span = 0;
                this.layout.shower_span = 20;
            },
            editorAndShower() {
                this.editable = true;
                this.visual = true;
                this.layout.editor_span = 10;
                this.layout.shower_span = 10;
            }
        },
        mounted() {
            this.init()
        },
        activated() {
            this.init();
        }
    }
</script>

<style type="text/css" scoped>

</style>
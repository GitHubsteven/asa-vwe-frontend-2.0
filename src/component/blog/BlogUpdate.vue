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
            <el-col :span="layout.editor_span" :offset="layout.editor_offset" id="editor" v-show="isEditable">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="blog.context"
                        maxlength="10000"
                        show-word-limit
                        :autosize="{ minRows: 50, maxRows: 1000 }"
                >
                </el-input>
            </el-col>
            <el-col :span="layout.shower_span" :offset="layout.editor_offset" id="shower" v-show="isVisual">
                <el-input
                        type="textarea"
                        v-html="convertMarkdown(blog.context)"
                        :autosize="{ minRows: 50, maxRows: 300 }"
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="23" :offset="1">
                <el-button type="primary" @click="saveDraft()">Save Draft</el-button>
                <el-button type="primary" @click="update()">Update</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="23" :offset="1">
                <el-select
                        v-model="blog.categories"
                        filterable
                        collapse-tags
                        default-first-option
                        placeholder="请选择文章类型">
                    <el-option
                            v-for="item in cateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {BlogService} from "../../_services/blog.service";
    import {ConvertService} from "../../_services/convert.service";
    import * as _ from "lodash";


    let convertService = new ConvertService();
    let blogService = new BlogService();

    let blogTmp = {};
    export default {
        name: "blog-update",
        components: {},
        data: function () {
            return {
                blog: {
                    title: null,
                    context: null,
                    author: null,
                    createTime: new Date(),
                    categories: null,
                    id: null
                },
                isEditable: true,
                isVisual: false,
                layout: {
                    editor_span: 20,
                    editor_offset: 1,
                    shower_span: 10,
                    shower_offset: 1
                },
                cateOptions:[]
            }
        },
        methods: {
            convertMarkdown(context) {
                return convertService.makeHtml(context);
            },

            init() {
                //init the layer
                this.layout.editor_span = 20;
                this.layout.shower_span = 0;
                let blogId = this.$route.query.blogId;
                //init from the session draft if exists
                let draft = sessionStorage.getItem(convertService.buildSessionKey("update", blogId, null));
                if (draft) {
                    let draftBlog = JSON.parse(draft);
                    Object.assign(this.blog, draftBlog);
                    return;
                }
                //init from xhr request if session's draft not exist
                if (blogId) {
                    this.getBlog(blogId);
                }
                // init category options
                let vweSetting = localStorage.getItem("vwe-setting");
                if (vweSetting) {
                    let categories = JSON.parse(vweSetting).categories;
                    categories.forEach(cate => {
                        this.cateOptions.push({value: cate, label: cate});
                    })
                }
            },

            getBlog(id) {
                blogService.viewBlog(id).then(resp => {
                    _.extend(this.blog, resp);
                    _.extend(this.blogTmp, resp);
                });
            },

            update() {
                let oldBlog = blogTmp;
                if (oldBlog.title === this.blog.title && oldBlog.context === this.blog.context && oldBlog.author === this.blog.author) {
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
                            blogId: this.blog._id
                        }
                    })
                }, (error) => {
                    console.log(error);
                    window.alert("update failed!");
                });
            },
            onlyEditor() {
                this.renderEditor(true, 20, false, 0);
            },
            onlyShower() {
                this.renderEditor(false, 0, true, 20);
            },
            editorAndShower() {
                this.renderEditor(true, 10, true, 10)
            },
            /**
             * @param isEditable if show editor
             * @param editor_span editor span if show
             * @param isVisual if show shower
             * @param shower_span shower span
             */
            renderEditor(isEditable, editor_span, isVisual, shower_span) {
                this.isEditable = isEditable;
                this.isVisual = isVisual;
                this.layout.editor_span = editor_span;
                this.layout.shower_span = shower_span;
            },
            /**
             * save the draft
             */
            saveDraft() {
                if (this.blog.context || this.blog.title) {
                    sessionStorage.setItem(convertService.buildSessionKey("update", this.blog._id, null), JSON.stringify(this.blog));
                    alert("save successfully!");
                } else {
                    alert("blog can not be empty!");
                }
            },
        },
        created() {
            this.init();
        },
        mounted() {

            document.onkeydown = (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    //  执行save方法
                    this.saveDraft();
                    // 阻止默认事件
                    e.preventDefault()
                }
            }
        },
        activated() {
            this.init();
        }
    }
</script>

<style type="text/css" scoped>

</style>
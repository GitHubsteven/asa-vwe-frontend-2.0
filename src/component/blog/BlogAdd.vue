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
                <el-button type="primary" @click="create()">Create</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {BlogService} from "../../_services/blog.service";
    import {ConvertService} from "../../_services/convert.service";
    import {mapState, mapActions} from "vuex";

    let convertService = new ConvertService();
    let blogService = new BlogService();

    export default {
        name: "blog-add",
        components: {},
        data: function () {
            return {
                blog: {
                    title: null,
                    context: null,
                },
                isEditable: true,
                isVisual: false,
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
                    //页面跳转
                    this.clearDraft();
                    this.$router.push({
                        path: '/blog-list',
                        name: 'BlogList'
                    })
                })
            },
            convertMarkdown(context) {
                return convertService.makeHtml(context);
            },

            init() {
                let draft = this.getDraft();
                if (draft) {
                    Object.assign(this.blog, draft);
                }
                this.layout.editor_span = 20;
                this.layout.shower_span = 0;
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
                    sessionStorage.setItem(convertService.buildSessionKey("add", null, null), JSON.stringify(this.blog));
                    alert("save successfully!");
                } else {
                    alert("blog can not be empty!");
                }
            },
            /**
             * 删除草稿
             */
            clearDraft() {
                sessionStorage.removeItem(convertService.buildSessionKey("add", null, null));
            },
            getDraft() {
                let draftJson = sessionStorage.getItem(convertService.buildSessionKey("add", null, null));
                if (draftJson) {
                    return JSON.parse(draftJson);
                }
                return null;
            }
        },
        //初始化的时候
        created() {
            this.init();
        },
        //渲染后
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
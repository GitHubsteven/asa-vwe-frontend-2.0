<template>
    <div>
        <el-row>
            <el-col :span="10" :offset="8">
                <div class="grid-content bg-purple-dark" id="blog">
                    <h3>{{this.blog.title}}</h3>
                    <el-tag type="info">{{this.blog.author}}</el-tag>
                    <el-tag type="info">{{this.blog.createTime}}</el-tag>
                    <hr/>
                    <el-input
                            type="textarea"
                            v-html="convertMarkdown(blog.context)"
                            maxlength="3000"
                            show-word-limit
                            :autosize="{ minRows: 50, maxRows: 300 }"
                    >
                    </el-input>
                </div>
                <div>

                </div>
            </el-col>
        </el-row>
        <!--增加评论输入区-->
        <el-row style="margin-top: 50px">
            <el-col :span="7" :offset="8">
                <el-form :model="comment" ref="dynamicValidateForm" label-width="60px"
                         label-position="left" class="demo-dynamic" id="comment">
                    <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-input v-model="comment.email"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="评论"
                            prop="context"
                            :rules="{
                          required: true, message: '评论不能为空', trigger: 'blur'
                        }"
                    >
                        <el-input v-model="comment.context"
                                  type="textarea"
                                  rows="5"
                                  max-length="300"
                                  show-word-limit
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitComment(comment)">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="7" :offset="8">
                <div class="grid-content bg-purple-light">
                    <div v-for="com in blogComments" v-bind:key="com.id">
                        <blog-comment v-bind:commentObj="com"></blog-comment>
                    </div>
                    <!--引用评论-->
                    <el-dialog :before-close="cancelRefCmdDialog"
                               :visible.sync="isRefComDialogVisual">
                        <el-card style="background-color: #FAFAFA">
                            <div>
                                <el-tag type="info">{{refCommentObj.author}}的评论</el-tag>
                                <p>{{refCommentObj.context}}</p>
                            </div>
                        </el-card>
                        <el-form :model="comment" style="margin-top: 10px">
                            <el-form-item label="" label-width="0px">
                                <el-input type="textarea"
                                          v-model="comment.context"
                                          rows="5"
                                          max-length="300"
                                          show-word-limit
                                >
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelRefCmdDialog()">取 消</el-button>
                            <el-button type="primary" @click="confirmRefCmdDialog()">确 定
                            </el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //引入接口辅助类
    import {ApiService} from '../../_services/apiService.js'
    import {AxiosService} from "../../_services/axiosService";
    import {ConvertService} from "../../_services/convertService";
    import BlogComment from "./CommentBlog.vue"
    import * as _ from "lodash"
    //定义一个对象
    const apiService = new ApiService();
    let axiosService = new AxiosService();

    let convertService = new ConvertService();

    export default {
        name: "blog-view",
        components: {
            "blog-comment": BlogComment
        },
        data() {
            return {
                blog: {
                    title: null,
                    context: null,
                    author: null,
                    createTime: null,
                    _id: null
                },
                comment: {
                    author: "asa.x",
                    email: null,
                    context: null,
                    blogId: this.$route.query.blogId,
                    refId: null
                },
                isRefComDialogVisual: false,
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                },
                blogComments: [],
                refCommentObj: {
                    _id: null,
                    context: null,
                    author: null
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            init() {
                let id = this.$route.query.blogId;
                // let id = "5e6e30037461303fa415e922";
                if (!id) {
                    this.$alert('没有id', '警告', {
                        confirmButtonText: '确定',
                        callback: action => {
                            //do nothing!
                        }
                    });
                }
                this.comment.blogId = id;
                this.getBlog(id);
                this.getComments(id);
            },
            getBlog(id) {
                apiService.viewBlog(id).then(resp => {
                    console.log(resp);
                    _.extend(this.blog, resp);
                });
            },
            getComments(blogId) {
                if (blogId == null) blogId = this.$route.query.blogId;
                axiosService.get("/blog-comments/" + blogId).then(resp => {
                    this.blogComments = convertService.divideComment(resp);
                });
            },
            convertMarkdown(context) {
                return convertService.makeHtml(context);
            },
            /**
             * 提交评论
             * @param comment
             */
            submitComment(comment) {
                if (!comment.email || !comment.context) {
                    window.alert("邮箱和评论不能为空！");
                    return;
                }
                axiosService.post("/comments-create/", comment).then((resp) => {
                    if (resp._id) {
                        //表示成功
                        this.$notify({
                            title: '成功',
                            message: "保存成功",
                            type: 'success'
                        });
                        convertService.clearObjVal(this.comment);
                        this.getComments(this.$route.query.blogId);
                    } else {
                        //表示失败
                        this.$notify({
                            title: '失败',
                            message: '保存失败！',
                            type: 'warning'
                        });
                    }
                    this.isRefComDialogVisual = false;
                })
            },
            reportComment(com) {
                window.alert("举报评论!");
            },
            refComment(com) {
                if (this.refCommentObj._id != null) {
                    window.alert("请先关闭其他为完成的评论!");
                    return;
                }
                Object.assign(this.refCommentObj, com);
                this.isRefComDialogVisual = true;
            },
            delComment(com) {
                window.alert("删除评论：" + com.context);
            },
            confirmRefCmdDialog() {
                this.comment.refId = this.refCommentObj._id;
                this.isRefComDialogVisual = false;
                this.submitComment(this.comment);
            },
            cancelRefCmdDialog() {
                this.isRefComDialogVisual = false;
            },
            getRefComments(comment) {
                window.alert("查看引用的评论");
            },
            isHasRefComment(refId) {
                return !!refId;
            },
            handleNodeClick(data) {
                console.log(data);
            },

        },
        mounted() {
            this.init();
        },
        watch: {
            isRefComDialogVisual(value) {
                if (value != null) {
                    if (value === false) {
                        convertService.clearObjVal(this.refCommentObj);
                    }
                }
            }
        }
    }
</script>

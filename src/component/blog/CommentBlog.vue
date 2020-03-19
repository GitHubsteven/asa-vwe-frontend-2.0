<template>
    <div>
        <el-card class="box-card" body-style="{ padding: '5px',margin-top:10px }"
                 style="margin-top: 10px;">
            <div class="text item">
                <div>
                    <strong>{{commentObj.author}}:</strong> {{commentObj.context}}
                    <el-tag type="info">{{commentObj.createTime == null ? "null"
                        :commentObj.createTime.substring(0,19)}}
                    </el-tag>
                </div>
                <el-button style="float: right; padding: 3px 2px;color: red" type="text"
                           @click="reportComment()">
                    举报
                </el-button>
                <el-button style="float: right; padding: 3px 2px;color: red" type="text"
                           @click="delComment()">
                    删除
                </el-button>
                <el-button style="float: right; padding: 3px 2px;" type="text"
                           @click="refComment()">
                    引用
                </el-button>
                <el-button
                        v-show="commentObj.subComments !=null && commentObj.subComments.length>0"
                        style="float: right; padding: 3px 2px;"
                        type="text"
                        @click="isShowAttachComments = !isShowAttachComments">
                    已引用评论
                </el-button>
                <div v-show="isShowAttachComments" style="margin-top: 40px">
                    <blog-comment v-for="ele in commentObj.subComments" v-bind:key="ele._id"
                                  v-bind:commentObj="ele"></blog-comment>
                </div>
                <el-dialog title="评论区" :visible.sync="commentFormVisible">
                    <el-form :model="comment" ref="dynamicValidateForm" label-width="60px"
                             label-position="left" class="demo-dynamic" id="comment">
                        <div>
                            <el-tag type="info">回复<span class="el-icon-caret-right"></span>
                                {{commentObj.author}}
                            </el-tag>
                            <p>{{commentObj.context}}</p>
                        </div>
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
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
  import {AxiosService} from "../js/axiosService";
  import {ConvertService} from "../js/convertService";

  let axiosService = new AxiosService();
  let convertService = new ConvertService();

  export default {
    name: "blog-comment",
    props: {
      commentObj: {
        author: "asa.x",
        createTime: "2019-06-24 13:14:15",
        context: null,
        subComments: [],
        _id: null
      }
    },
    data() {
      return {
        isShowAttachComments: false,
        commentFormVisible: false,
        comment: {
          email: null,
          context: null,
          author: "asa-x",
          refId: null
        },
        commentTmp: this.commentObj
      }
    },
    methods: {
      getRefComments() {

      },
      getSubComments(comment) {
        axiosService.get("/comment-getSubs/" + comment.blogId + "/" + comment._id)
          .then(subComments => {
            comment.subComments = convertService.divideComment2(subComments, comment._id);
          });
      },
      reportComment() {
      },
      delComment() {
      },
      refComment() {
        this.commentFormVisible = true;
      },
      submitComment(comment) {
        if (!comment.context) {
          window.alert("邮箱和评论不能为空！");
          return;
        }
        comment.email = "ref comment@asa.com";
        comment.refId = this.commentTmp._id;
        comment.blogId = this.commentTmp.blogId;
        if (!comment.refId) {
          window.alert("refId is blank!");
          return;
        }
        comment.author = "asa.x";
        axiosService.post("/comments-create", comment).then((resp) => {
          convertService.clearObjVal(this.comment);
          this.commentFormVisible = false;
          if (resp && resp._id) {
            //表示成功
            this.getSubComments(this.commentObj);
            this.$notify({
              title: '成功',
              message: "保存成功",
              type: 'success'
            });
            // this.getComments(this.$route.query.blogId);
          } else {
            //表示失败
            this.$notify({
              title: '失败',
              message: '保存失败！',
              type: 'warning'
            });
            console.log(resp);
            this.isShowAttachComments = false;
          }
        })
      }
    },
    watch: {
      commentObj: function (oldValue, newValue) {
        if (!oldValue._id && newValue._id) {
          Object.assign(this.commentTmp, newValue);
        }
      }
    }
  }
</script>

<style scoped>

</style>
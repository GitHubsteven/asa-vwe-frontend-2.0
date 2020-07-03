<template>
    <div>
        <el-row style="margin-bottom: 10px">
            <el-col :span="5">
                <el-input placeholder="请输入内容" v-model="addedCate.name">
                    <template slot="prepend">新增分类</template>
                </el-input>
            </el-col>
            <el-col :span="2" style="margin-left: 20px">
                <el-button v-show="true" type="success" icon="el-icon-check" circle
                           @click="addCate()" :disabled="!addedCate.name"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tag>{{$t('lang.CATEGORY_LIST')+"("+this.categories.length+")"}}</el-tag>
            </el-col>
        </el-row>
        <div v-for="category in categories" v-bind:key="category._id" style="margin-top: 10px">
            <el-row>
                <el-col :span="5">
                    <el-input v-model="category.name" :disabled="!category.isEditable"/>
                </el-col>
                <el-col :span="18" :offset="1">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editCate(category)"/>
                    <el-button v-show="true" type="success" icon="el-icon-check" circle
                               @click="confirmCate(category)"/>
                    <el-button v-show="true" type="danger" icon="el-icon-delete" circle
                               @click="deleteCate(category.id)"/>
                </el-col>
            </el-row>
        </div>
        <br>
    </div>
</template>

<script>
    import {CategoryService} from "../../_services/category.service.js"
    import * as _ from "lodash"
    import {mapState, mapActions} from "vuex";

    let categoryService = new CategoryService();

    export default {
        name: "Category",
        data() {
            return {
                cateNum: 2,
                categories: [{name: "test", _id: 1, isEditable: false}],
                addedCate: {
                    name: null
                },
                userTmp: null
            }
        },
        methods: {
            editCate(category) {
                category.isEditable = true;
            },
            confirmCate(category) {
                alert("update category[id]: " + category.id);
                category.isEditable = false;
            },
            deleteCate(category) {
                this.$confirm('确定要删除这个分类吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    categoryService.delCategory(category._id).then(resp => {
                        if (resp) {
                            this.listCategories();
                        } else {
                            window.alert("delete failed!");
                        }
                    })
                }).catch(() => {
                    this.$alert("delete error!")
                });
            },
            addCate() {
                // clear the added the refresh the existed category list
                _.extend(this.addedCate, {});
                categoryService.createCategory(this.addedCate);
                this.addedCate.name = null;
            },
            listCategories() {
                categoryService.listCategories().then(resp => {
                    // 这里很奇怪，返回的结果不应该这么直接的，和共同的封装有问题
                    this.categories = resp;
                    this.categories.forEach((cate) => {
                        cate.isEditable = false;
                    })
                })
            }
        },
        mounted() {
            this.listCategories();
        }
    }
</script>

<style scoped>

</style>
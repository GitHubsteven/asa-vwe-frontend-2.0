<template>
    <div>
        <el-row>
            <el-col>
                <el-tag>{{$t('lang.CATEGORY_LIST')}}</el-tag>
            </el-col>
        </el-row>
        <div v-for="category in categories" v-bind:key="category.id" style="margin-top: 10px">
            <el-row>
                <el-col :span="5">
                    <el-input v-model="category.name" :disabled="!category.isEditable"/>
                </el-col>
                <el-col :span="18" :offset="1">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editCate(category)"/>
                    <el-button v-show="true" type="success" icon="el-icon-check" circle
                               @click="confirmCate(category)"/>
                    <el-button v-show="true" type="danger" icon="el-icon-delete" circle
                               @click="deleteCate(category._id)"/>
                </el-col>
            </el-row>
        </div>
        <br>
        <el-row>
            <el-col :span="5">
                <el-input placeholder="请输入内容" v-model="addedCate.name">
                    <template slot="prepend">新增分类</template>
                </el-input>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button v-show="true" type="success" icon="el-icon-check" circle
                           @click="addCate()"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {CategoryService} from "../../_services/category.service"
    import {mapActions, mapState} from "vuex"

    let categoryService = new CategoryService();

    export default {
        name: "Category",
        data() {
            return {
                cateNum: 2,
                categories: [],
                addedCate: {
                    name: null
                },
                editCateName: null
            }
        },
        methods: {
            editCate(category) {
                this.editCateName = category.name;
                category.isEditable = true;
            },
            confirmCate(category) {
                if (this.editCateName === category.name) {
                    alert("category has not been changed!");
                    category.isEditable = false;
                    return;
                }
                categoryService.update(category).then(resp => {
                    category.isEditable = false;
                })
            },

            deleteCate(category) {
                this.$confirm('确定要删除这条目录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    categoryService.delCategory(blog._id).then(resp => {
                        this.init();
                    })
                }).catch(() => {
                    //console.log("cancel the confirm")
                });
            },
            addCate() {
                // clear the added the refresh the existed category list
                this.categories.push({name: this.addedCate.name, id: this.cateNum++});
                this.addedCate.name = null;
            },
            init() {
                categoryService.listCategories().then((resp) => {
                    resp.forEach(it => {
                        it.isEditable = false;
                    });
                    this.categories = resp;
                })
            }
        },
        mounted() {
            this.init();
        },
        computed: {}
    }
</script>

<style scoped>

</style>
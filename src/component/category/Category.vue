<template>
    <div>
        <el-row>
            <el-col>
                <el-tag>{{$t('lang.CATEGORY_LIST')}}</el-tag>
            </el-col>
        </el-row>
        <div v-for="category in _getCategories" v-bind:key="category.key" style="margin-top: 10px">
            <el-row>
                <el-col :span="5">
                    <el-input v-model="category.value" :disabled="!category.isEditable"/>
                </el-col>
                <el-col :span="18" :offset="1">
                    <el-button v-show="status.loggedIn" type="primary" icon="el-icon-edit" circle
                               @click="editCate(category)"/>
                    <el-button v-show="status.loggedIn" type="success" icon="el-icon-check" circle
                               @click="confirmCate(category)"/>
                    <el-button v-show="status.loggedIn" type="danger" icon="el-icon-delete" circle
                               @click="deleteCate(category.key)"/>
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
                <el-button v-show="status.loggedIn" type="success" icon="el-icon-check" circle
                           @click="addCate()"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {CategoryService} from "../../_services/category.service"
    import {mapActions, mapState, mapGetters} from "vuex"
    // import * as _ from "lodash";
    // import * as vweConstant from "../../common/constants";

    let categoryService = new CategoryService();

    export default {
        name: "Category",
        data() {
            return {
                addedCate: {
                    name: null
                },
                editCateName: null
            }
        },
        methods: {
            // ['setting/refresh', 'setting/addCate', 'setting/updateCate', 'setting/delCate', 'setting/changeEditable']
            ...mapActions({
                refresh: 'setting/refresh',
                _addCate: 'setting/addCate',
                _updateCate: 'setting/updateCate',
                _delCate: 'setting/delCate',
                changeEditable: 'setting/changeEditable'
            }),
            editCate(category) {
                this.editCateName = category.value;
                this.changeEditable({"key": category.key, "isEditable": true});
            },
            confirmCate(category) {
                if (this.editCateName === category.value) {
                    alert("category has not been changed!");
                    this.changeEditable({"key": category.key, "isEditable": false});
                    return;
                }
                this._updateCate({
                    _id: category.key,
                    name: category.value
                });
            },

            deleteCate(categoryId) {
                this.$confirm('确定要删除这条目录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._delCate(categoryId);
                }).catch((err) => {
                    this.alert(err)
                });
            },
            addCate() {
                // clear the added the refresh the existed category list
                this._addCate(this.addedCate);
            }
        },
        mounted() {
        },
        computed: {
            ...mapGetters({
                _getCategories: 'setting/getCategories'
            }),
            ...mapState({
                status: state => state.account.status
            })
        }
    }
</script>

<style scoped>

</style>
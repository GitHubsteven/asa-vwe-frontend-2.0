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
                               @click="deleteCate(category.id)"/>
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
            <el-col :span="2">
                <el-button v-show="true" type="success" icon="el-icon-check" circle
                           @click="addCate()"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "Category",
        data() {
            return {
                cateNum: 2,
                categories: [
                    {
                        id: 1,
                        name: "spring",
                        isEditable: false
                    }, {
                        id: 2,
                        name: "mysql",
                        isEditable: false
                    }
                ],
                addedCate: {
                    name: null
                }
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
                alert("delete category[id]: " + category.id);
            },
            addCate() {
                // clear the added the refresh the existed category list
                this.categories.push({name: this.addedCate.name, id: this.cateNum++});
                this.addedCate.name = null;
            }
        }
    }
</script>

<style scoped>

</style>
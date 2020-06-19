<template>
    <div>
        <el-row>
            <el-col>
                <el-tag>Existed Categories</el-tag>
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
    </div>
</template>

<script>

    export default {
        name: "Category",
        data() {
            return {
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
                ]
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

            addCate(category) {
                alert("add category[name]: " + category.name);
            }
        }
    }
</script>

<style scoped>

</style>
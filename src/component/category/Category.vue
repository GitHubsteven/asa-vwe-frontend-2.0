<template>
    <div>
        <el-row>
            <el-col>
                <el-tag>Existed Categories</el-tag>
            </el-col>
            <el-col :span="15" :offset="1">


                <div v-for="category in categories" v-bind:key="category.id">
                    <el-input v-model="category.name">
                        <template slot="prepend" disabled="category.isEditable">{{category.name}}</template>
                        <el-button type="primary" icon="el-icon-edit" circle @click="editCate(category)"></el-button>
                        <el-button v-show="category.isEditable" type="success" icon="el-icon-check" circle
                                   @click="confirmCate(category)"/>
                        <el-button type="danger" icon="el-icon-delete" circle
                                   @click="deleteCate(category.id)"></el-button>
                    </el-input>
                </div>

            </el-col>

        </el-row>
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

            deleteCate(id) {
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
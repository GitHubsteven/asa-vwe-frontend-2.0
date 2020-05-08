<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="8" style="margin-top: 10%">
                <el-form :model="userLoginForm" ref="userLoginForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            prop="username"
                            label="username"
                            :rules="[
                              { required: true, message: 'username不能为空', trigger: 'blur' }
                            ]"
                    >
                        <el-input v-model="userLoginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码"
                            prop="password"
                            :rules="{
                          required: true, message: '密码不能为空', trigger: 'blur'
                        }"
                    >
                        <el-input type="password" v-model="userLoginForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-link :underline="true" href="/register">没有账号？注册</el-link>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('userLoginForm')">登录</el-button>
                        <el-button @click="resetForm('userLoginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "user-login",
        data() {
            return {
                userLoginForm: {
                    username: '',
                    password: ''
                },
                username: ''
            };
        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) return false;
                    this.login(this.userLoginForm)
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="8" style="margin-top: 10%">
                <el-form :model="userLoginForm" ref="userLoginForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]"
                    >
                        <el-input v-model="userLoginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码"
                            prop="pass"
                            :rules="{
                          required: true, message: '密码不能为空', trigger: 'blur'
                        }"
                    >
                        <el-input type="password" v-model="userLoginForm.pass" autocomplete="off"></el-input>
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
    import {AxiosService} from "../../_services/axiosService"

    let axiosService = new AxiosService();

    export default {
        name: "user-login",
        data() {
            return {
                userLoginForm: {
                    email: '',
                    pass: ''
                },
                username: ''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axiosService.post("/user-login", this.userLoginForm).then((resp) => {
                            if (resp._id) {
                                resp['username'] = resp.name;
                                setTimeout(() => {
                                    // this.$store.commit('setUser', resp);
                                    localStorage.setItem("user", JSON.stringify(resp));
                                    resp['username'] = resp['name'];
                                    this.$store.commit("setUser", resp);
                                    this.$router.push({
                                        path: '/blog-list',
                                        name: 'BlogList',
                                    })
                                }, 1000)
                            } else {
                                alert(resp.message || "login failed!");
                            }
                        })
                    } else {
                        alert("plz fill the login information correctly!");
                        return false;
                    }
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
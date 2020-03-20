<template>
    <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 8%">
            <el-form :model="register" status-icon :rules="rules" ref="register" label-width="100px"
                     class="demo-register">
                <el-form-item label="名称" prop="name">
                    <el-input type="text" v-model="register.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="register.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="register.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="register.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('register')">提交</el-button>
                    <el-button @click="resetForm('register')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
    import {AxiosService} from "../../_services/axiosService"

    let axiosService = new AxiosService();
    export default {
        name: "user-register",
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                }
                callback();
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.register.checkPass !== '') {
                        this.$refs.register.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.register.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入邮箱"));
                } else {
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(String(value).toLowerCase())) {
                        callback(new Error('请输入正确的邮箱地址!'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                register: {
                    name: "",
                    email: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    name: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmail, trigger: ['blur', 'change']}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let main = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axiosService.post("/user-register", this.register).then(resp => {
                            //如果_id存在的话，那么就是注册成功了
                            if (typeof resp === 'object' && resp._id) {
                                setTimeout(function () {
                                    alert("register successfully!");
                                    main.$router.push({
                                        path: '/user-login',
                                        name: 'UserLogin',
                                    })
                                }, 1000)
                            } else {
                                alert(resp.message);
                            }
                        })
                    } else {
                        alert('plz fill the info correctly!');
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
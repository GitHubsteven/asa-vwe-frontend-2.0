<template>
    <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 8%">
            <el-form :model="register" status-icon :rules="rules" ref="register" label-width="100px"
                     class="demo-register">
                <el-form-item label="Name" prop="username">
                    <el-input type="text" v-model="register.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="register.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="CheckPassword" prop="checkPwd">
                    <el-input type="password" v-model="register.checkPwd" autocomplete="off"></el-input>
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
    import {mapState, mapActions} from "vuex"

    export default {
        name: "user-register",
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                }
                callback();
            };
            let validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.register.checkPwd !== '') {
                        this.$refs.register.validateField('checkPwd');
                    }
                    callback();
                }
            };
            let validateCheckPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.register.password) {
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
                    username: "",
                    email: '',
                    password: '',
                    checkPwd: ''
                },
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmail, trigger: ['blur', 'change']}
                    ],
                    password: [
                        {validator: validatePwd, trigger: 'blur'}
                    ],
                    checkPwd: [
                        {validator: validateCheckPwd, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            ...mapActions(['account/register']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) return false;
                    let user = Object.assign({}, this.register);
                    delete user.checkPwd;
                    this['account/register'](user);
                });
            },
            /**
             * 通过axios来注册，可能会被放弃
             */
            registerViaAxios() {
                axiosService.post("/user-register", this.register).then(resp => {
                    //如果_id存在的话，那么就是注册成功了
                    if (typeof resp === 'object' && resp._id) {
                        setTimeout(function () {
                            main.$router.push({
                                path: '/user-login',
                                name: 'UserLogin',
                            })
                        }, 1000)
                    } else {
                        alert(resp.message);
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            ...mapState('account', ['status'])
        }
    }
</script>

<style scoped>

</style>
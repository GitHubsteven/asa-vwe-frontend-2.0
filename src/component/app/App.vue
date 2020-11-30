<template>
    <div style="margin-bottom: 1%">
        <el-container style="height: 100%; min-height: 700px">
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                         @select="handleSelect">
                    <el-menu-item index="/blog-list">
                        Blogs
                    </el-menu-item>
                    <el-menu-item index="/statistics">
                        Statistics
                    </el-menu-item>
                    <el-menu-item index="/about-me">
                        About Me
                    </el-menu-item>
                    <el-menu-item>
                        <el-dropdown @command="handleCommand">
                               <span class="el-dropdown-link">
                                 Api<i class="el-icon-arrow-down el-icon--right"></i>
                               </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="spring">Spring</el-dropdown-item>
                                <el-dropdown-item command="express">Express</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                    <el-menu-item v-if="user == null" index="/login" style="float: right">
                        Login
                    </el-menu-item>
                    <el-menu-item v-if="user != null" style="float: right">
                        <el-dropdown>
                                  <span class="el-dropdown-link">
                                    {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-link @click="logoutBtn()">Logout</el-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-link @click="changeLanguage()">
                                        language
                                    </el-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <div><span v-if="alert.message" :class="`alert ${alert.type}`"> {{alert.message}}</span></div>
                <router-view></router-view>
            </el-main>
            <div class="line"></div>

        </el-container>
    </div>
</template>

<script>
    import {router} from '../../_helpers/router.js'
    import {mapActions, mapState, mapMutations} from "vuex"

    export default {
        name: "App",
        components: {
            Navigator
        },
        data() {
            return {
                activeIndex: '/blog-list'
            };
        },
        methods: {
            ...mapMutations('env', {
                switchEnv: 'switchTo'
            }),
            ...mapActions({
                clearAlert: 'alert/clear',
                logout: 'account/logout',
                // switchEnv: 'env/switchTo',
                initSetting: 'setting/refresh'
            }),
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logoutBtn() {
                this.logout();
                this.$router.push({
                    path: '/login'
                })
            },
            handleCommand(apiEnv) {
                this.switchEnv(apiEnv);
            },
            changeLanguage() {
                this.$confirm('确定切换语言吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.$i18n.locale === 'zh-CN') {
                        this.$i18n.locale = 'en-US';//关键语句
                        console.log('en-US')
                    } else {
                        this.$i18n.locale = 'zh-CN';//关键语句
                        console.log('zh-CN')
                    }
                }).catch(() => {
                    console.log('catch');
                    this.$message({
                        type: 'info',
                    });
                });
            },
            init() {
                this.initSetting();
            }
        },
        mounted() {
            this.init()
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                status: state => state.account.status,
                user: state => state.account.user,
                env: state => state.env.apiEnv
            }),
            appEnv() {
                const env = this.env || localStorage.getItem('vwe_env')
                const doc = document.getElementsByTagName('body');
                doc[0].className = `${doc[0].className} env_${env}`
                return env
            }
        },
        watch: {
            $route(to, from) {
                // clear alert on location change
                this.clearAlert();
            },
            appEnv(val) {
                const doc = document.getElementsByTagName('body');
                console.log(doc);
            }
        },
        router
    }
</script>

<style scoped>

</style>
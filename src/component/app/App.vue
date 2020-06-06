<template>
    <div style="margin-bottom: 1%">
        <el-container style="height: 100%; min-height: 700px" :class="`env_${env}`">
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                         @select="handleSelect">
                    <el-menu-item index="/blog-list">
                        Blogs
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
                                <el-dropdown-item>language</el-dropdown-item>
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
            <el-footer class="footer_context"><label>© 2020 imango.top |<a
                    href="http://www.beianbeian.com/beianxinxi/8300a5eebbc046ac3cfddc082dacc0fc.html">赣ICP备20006372号-1</a></label>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {router} from '../../_helpers/router.js'
    import {mapActions, mapState} from "vuex"

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
            ...mapActions({
                clearAlert: 'alert/clear',
                logout: 'account/logout',
                switchEnv: 'env/switchTo',
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
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                status: state => state.account.status,
                user: state => state.account.user,
                env: state => state.env.apiEnv
            })
        },
        watch: {
            $route(to, from) {
                // clear alert on location change
                this.clearAlert();
            }
        },
        router
    }
</script>

<style scoped>

</style>
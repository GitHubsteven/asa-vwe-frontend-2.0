<template>
    <div>
        <div>
            <el-container style="height: 100%; min-height: 700px">
                <el-header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router background-color="#000000"
                             @select="handleSelect">
                        <el-menu-item index="/blog-list">
                            Blogs
                        </el-menu-item>
                        <el-menu-item v-if="user == null" index="/login" style="float: right">
                            Login
                        </el-menu-item>
                        <el-menu-item v-if="user != null" style="float: right">
                            <el-link @click="logout()">Logout</el-link>
                        </el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </el-main>
                <div class="line"></div>
                <el-footer class="footer_context"><label>All CopyRight@asa.x.com</label></el-footer>
            </el-container>
        </div>
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
            // ...mapActions("account", ["logout"]),
            ...mapActions({
                clearAlert: 'alert/clear',
                logout: 'account/logout'
            }),
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                status: state => state.account.status,
                user: state => state.account.user
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
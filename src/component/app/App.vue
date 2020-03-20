<template>
    <div>
        <div>
            <el-container style="height: 100%; min-height: 700px">
                <el-header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                             @select="handleSelect">
                        <el-menu-item index="/blog-list">
                            Blogs
                        </el-menu-item>
                        <el-menu-item v-if="username == null" index="/user-login" style="float: right">
                            Login
                        </el-menu-item>
                        <el-menu-item v-if="username != null" style="float: right">
                            <el-link onclick="loginOut()">Logout</el-link>
                        </el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <div class="line"></div>
                <el-footer class="footer_context"><label>All CopyRight@asa.x.com</label></el-footer>
            </el-container>
        </div>
    </div>
</template>

<script>
    import router from '../../_helpers/router.js'

    export default {
        name: "App",
        components: {
            Navigator
        },
        data() {
            return {
                activeIndex: '/blog-list',
                username: this.store ? this.store.username : "asa.x"
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            loginOut() {
                alert("确定要退出吗？");
                this.store.commit("setUsername(null)");
            },
        },
        router
    }
</script>

<style scoped>

</style>
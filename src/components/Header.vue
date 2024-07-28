<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-26 10:25:06
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-28 22:29:30
-->
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#113c6b"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/webjob">地震作业Web编辑器</el-menu-item>
      <!-- <el-menu-item index="/webjobwork">Web运行器</el-menu-item> -->
      <el-submenu index="3">
        <template slot="title">相关单位</template>
        <el-menu-item>
          <a href="https://www.cumtb.edu.cn/" class="custom-link">中国矿业大学（北京）</a>
        </el-menu-item>
        <el-menu-item>
          <a href="https://www.upc.edu.cn/" class="custom-link">中国石油大学（华东）</a>
        </el-menu-item>
        <el-menu-item>
          <a href="http://bgp.cnpc.com.cn/" class="custom-link">东方物探公司</a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        ><a href="http://ieco.upc.edu.cn/main.htm" class="custom-link"
          >BGP2024</a
        ></el-menu-item
      >
      <el-menu-item index="/" disabled>数据库</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/",
    };
  },
  mounted() {
    this.updateActiveIndex();
    this.$router.afterEach((to) => {
      this.activeIndex = to.path;
    });
  },
  watch: {
    $route() {
      this.updateActiveIndex();
    },
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
      this.navigateTo(key);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    updateActiveIndex() {
      this.activeIndex = this.$route.path;
    },
  },
};
</script>

<style>
.el-menu-demo a {
  text-decoration: none; /* 去掉链接的下划线 */
}
.custom-link {
  color: white; /* 字体颜色为白色 */
  text-decoration: none; /* 去掉下划线 */
}

.custom-link:hover {
  color: #ffd04b; /* 悬停时字体变色 */
}
</style>

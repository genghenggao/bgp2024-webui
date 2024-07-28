<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-26 09:24:23
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-26 15:26:07
-->
<template>
  <el-container>
    <el-header><Header /> </el-header>
    <el-main>
      <div id="HomeContent">
        <el-row :gutter="20">
          <el-col :span="8">
            <info-card
              title="桌面引擎"
              subtitle="GeoEast"
              img-src="service1.png"
              link="#"
            />
          </el-col>
          <el-col :span="8">
            <info-card title="开发引擎" subtitle="IECO" img-src="service2.png" link="#" />
          </el-col>
          <el-col :span="8">
            <info-card
              title="WEB引擎"
              subtitle="WebJob"
              img-src="service3.png"
              link="/webjob"
            />
          </el-col>
        </el-row></div
    ></el-main>
  </el-container>
</template>

<script>
import InfoCard from "./InfoCard.vue";
import Header from "./Header.vue";

export default {
  name: "HomePage",
  components: {
    InfoCard,
    Header,
  },
};
</script>

<style>
* {
  margin: 0;
}
body {
  background-color: #f5f5f5;
}
.el-header {
  padding: 0 !important;
  .el-menu-demo a {
    text-decoration: none; /* 去掉链接的下划线 */
  }
}
#HomeContent {
  padding: 80px 140px 0 140px;
}
</style>

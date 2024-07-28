<template>
  <div class="footer">
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="16"><h1>中国矿业大学（北京）</h1></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"><p>webjob V1.0</p></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {},
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce600;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.custom-link {
  color: white; /* 字体颜色为白色 */
  text-decoration: none; /* 去掉下划线 */
}

.custom-link:hover {
  color: #ffd04b; /* 悬停时字体变色 */
}
</style>

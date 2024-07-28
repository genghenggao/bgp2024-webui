<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-28 16:15:05
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-28 18:48:37
-->
<template>
  <el-container style="height: 100vh">
    <el-header><Header /></el-header>
    <el-container>
      <el-aside
        width="300px"
        style="overflow-y: auto; display: flex; flex-direction: column"
      >
        <div class="fixed-search-bar">
          <el-input placeholder="输入关键字查询" v-model="filterText">
            <template slot="prepend">作业检索</template>
          </el-input>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => runJob(node)">
                  run job
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header.vue";
import axios from "@/plugins/axios";
export default {
  name: "WebjobWork",
  components: { Header },
  data() {
    const data = [
      {
        id: 1,
        label: "作业一",
      },
      {
        id: 2,
        label: "作业二",
      },
      {
        id: 3,
        label: "作业三",
      },
    ];
    return {
      filterText: "",
      data: JSON.parse(JSON.stringify(data)),
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.getWebjoblist();
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取地地震作业
    getWebjoblist() {
      axios
        .get("/job-files/")
        .then((response) => {
          this.children = response.data.children;
          this.data = response.data.children;
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },
    runJob(node) {
      axios
        .post("/run-job/", {
          filename: node.data.label,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.el-header {
  padding: 0 !important;
}
.el-aside {
  height: 100%;
  background-color: #f7f9ff;
  .fixed-search-bar {
    background-color: #f7f9ff;
  }
}
</style>

<template>
  <div>
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          >
          <el-menu-item index="1">地震作业Web编辑器</el-menu-item>
          <el-submenu index="2">
            <template slot="title">GeoEast</template>
            <el-menu-item index="2-1">IECO</el-menu-item>
            <el-menu-item index="2-2">PYQT</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>BGP2024</el-menu-item>
        </el-menu></el-header
      >
      <el-container>
        <el-aside width="300px">
          <div class="block">
            <el-row>
              <el-input placeholder="输入关键字查询" v-model="filterText">
                <template slot="prepend">快捷检索</template>
              </el-input>
            </el-row>

            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              default-expand-all
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              ref="tree"
              :props="defaultProps"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" v-if="data.role" @click="() => append(data)">
                    <i class="el-icon-document-add"></i>
                  </el-button>
                  <el-button
                    type="text"
                    v-if="!data.role"
                    @click="() => remove(node, data)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                  <el-button
                    type="text"
                    v-if="!data.role"
                    @click="() => edit(node, data)"
                  >
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-aside>
        <el-main><LF /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LF from "./LF";

let id = 1000;
export default {
  name: "Home",
  components: { LF },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    const data = [
      {
        id: 1,
        label: "地震作业",
        role: true,
        children: [
          {
            id: 2,
            label: "作业一",
            role: false,
          },
        ],
      },
    ];
    return {
      activeIndex: "1",
      filterText: "",
      data: JSON.parse(JSON.stringify(data)),
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    edit(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      console.log(parent.data.children[index].label);

      this.lf.render(data.datajob);
      this.$_LfEvent();
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
.el-header {
  padding: 0 !important;
}
.el-main {
  padding: 0 !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

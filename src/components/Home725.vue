<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">地震作业Web编辑器</el-menu-item>
          <el-submenu index="2">
            <template slot="title">GeoEast</template>
            <el-menu-item index="2-1">IECO</el-menu-item>
            <el-menu-item index="2-2">PYQT</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>BGP2024</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div class="block">
            <el-row>
              <el-input placeholder="输入关键字查询" v-model="filterText">
                <template slot="prepend">快捷检索</template>
              </el-input>
            </el-row>

            <el-tree
              :data="datajob"
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
            <el-dialog
              title="添加新节点"
              :visible.sync="addNodeDialogVisible"
              @close="nameExistsWarning = false"
              width="500px"
            >
              <el-input
                v-model="newNodeName"
                placeholder="请输入节点名称"
                :error="nameExistsWarning"
                @keyup.enter="confirmAddNode"
              ></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addNodeDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAddNode">确定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-aside>
        <el-main>
          <div class="logic-flow-view">
            <el-row>
              <el-col :span="4">
                <!-- 显示当前文件名称及路径 -->
                <div class="demo-view">
                  <p>
                    <i class="el-icon-s-data"></i>正在编辑的文件:
                    {{ currentFile.name }}
                  </p>
                  <!-- <p>文件路径: {{ currentFile.path }}</p> -->
                </div></el-col
              >
              <el-col :span="10">
                <!-- 辅助工具栏 -->
                <Control
                  class="demo-control"
                  v-if="lf"
                  :lf="lf"
                  @catData="$_catData"
                  :folder-path="currentFile.path"
                  :file-name="currentFile.name"
                ></Control
              ></el-col>
            </el-row>

            <!-- 节点面板 -->
            <NodePanel v-if="lf" :lf="lf" :nodeList="nodeList"></NodePanel>
            <!-- 画布 -->
            <div id="LF-view" ref="container"></div>
            <!-- 用户节点自定义操作面板 -->
            <AddPanel
              v-if="showAddPanel"
              class="add-panel"
              :style="addPanelStyle"
              :lf="lf"
              :nodeData="addClickNode"
              @addNodeFinish="hideAddPanel"
            >
            </AddPanel>
            <!-- 属性面板 -->
            <el-drawer
              title="设置节点属性"
              :visible.sync="dialogVisible"
              direction="rtl"
              size="500px"
              :before-close="closeDialog"
            >
              <PropertyDialog
                v-if="dialogVisible"
                :nodeData="clickNode"
                :lf="lf"
                @setPropertiesFinish="closeDialog"
              ></PropertyDialog>
            </el-drawer>
            <!-- 数据查看面板 -->
            <el-dialog title="数据" :visible.sync="dataVisible" width="50%">
              <DataDialog :graphData="graphData"></DataDialog>
            </el-dialog></div
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/plugins/axios";
import LogicFlow from "@logicflow/core";
// const LogicFlow = window.LogicFlow
import { Menu, Snapshot, MiniMap } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import NodePanel from "./LFComponents/NodePanel";
import AddPanel from "./LFComponents/AddPanel";
import Control from "./LFComponents/Control";
import PropertyDialog from "./PropertySetting/PropertyDialog";
import DataDialog from "./LFComponents/DataDialog";
import { nodeList } from "./config";

import {
  registerStart,
  registerUser,
  registerEnd,
  registerPush,
  registerDownload,
  registerGeoDiskIn,
  registerGeoDiskOut,
  registerStacking,
  registerTakegatherattri,
  registerCumtbWeb,
  registerChannelMerge,
  registerPolyline,
  registerTask,
  registerConnect,
} from "./registerNode";
const demoData = require("./data.json");
// const datademo12 = require("./datademo12.json");

let id = 10000;

export default {
  name: "Home",
  components: { NodePanel, AddPanel, Control, PropertyDialog, DataDialog },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    const datajob = [
      {
        id: 0,
        label: "地震作业",
        role: true,
        children: [
          {
            id: 1,
            label: "作业示例一",
            role: false,
          },
          {
            id: 2,
            label: "作业实例二",
            role: false,
          },
        ],
      },
    ];

    return {
      jobFiles: [],
      activeIndex: "1",
      filterText: "",
      datajob: JSON.parse(JSON.stringify(datajob)),
      currentFile: { name: "", path: "" },
      // el-main
      lf: null,
      showAddPanel: false,
      addPanelStyle: {
        top: 0,
        left: 0,
      },
      nodeData: null,
      addClickNode: null,
      clickNode: null,
      dialogVisible: false,
      graphData: null,
      dataVisible: false,
      config: {
        background: {
          backgroundColor: "#f7f9ff",
        },
        grid: {
          size: 10,
          visible: false,
        },
        keyboard: {
          enabled: true,
        },
        edgeTextDraggable: true,
        hoverOutline: false,
      },
      moveData: {},
      nodeList,
      editData: {
        nodes: [
          {
            id: "8ceea38a-403a-4f85-8e32-cde3e675fd7e",
            type: "rect",
            x: 730,
            y: 310,
            properties: {},
          },
        ],
        edges: [],
      },
      newNodeName: "", // 新节点名称
      addNodeDialogVisible: false, // 添加节点对话框可见性
      nameExistsWarning: false, // 重名预警
    };
  },

  mounted() {
    this.$_initLf();
    this.getjobfilelist();
    this.loadFirstJobFile(); // 新增
    this.loadjobfile();
  },

  methods: {
    getjobfilelist() {
      axios
        .get("/job-files/")
        .then((response) => {
          this.children = response.data.children;
          // console.log(this.datajob[0].children);
          this.datajob[0].children = response.data.children;
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },

    loadFirstJobFile() {
      // 加载示例文件
      if (
        this.datajob[0] &&
        this.datajob[0].children &&
        this.datajob[0].children.length > 0
      ) {
        const firstFile = this.datajob[0].children[0];
        const jobname = firstFile.label;
        this.currentFile.name = jobname;
      }
    },

    loadjobfile(node) {
      const parent = node.parent;
      const jobname = parent.data.children[0].label;
      this.currentFile.name = jobname;
      this.currentFile.path = "/u1/GeoEast/ieco1.6.2/libso/batp/mod"; // 根据实际路径修改
      console.log(jobname);

      axios
        .post("/xml-to-json/", {
          folder_path: "/u1/GeoEast/ieco1.6.2/libso/batp/mod",
          file_name: jobname,
        })
        .then((response) => {
          this.lf.render(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    append(nodeData) {
      this.newNodeName = ""; // 清空新节点名称
      this.nameExistsWarning = false; // 清空重名预警
      this.addNodeDialogVisible = true; // 显示添加节点对话框

      // 保存当前要添加子节点的节点数据
      this.currentNodeData = nodeData;
    },
    confirmAddNode() {
      const newName = this.newNodeName.trim();

      if (newName === "") {
        this.$message.error("节点名称不能为空");
        return;
      }

      // 检查文件名是否以 .job 结尾
      if (!newName.endsWith(".job")) {
        this.nameExistsWarning = true;
        this.$message.error("文件名必须以.job结尾");
        return;
      }

      // 检查是否存在重名节点
      const checkDuplicate = (nodeData, name) => {
        if (nodeData.label === name) {
          return true;
        }
        if (nodeData.children) {
          return nodeData.children.some((child) => checkDuplicate(child, name));
        }
        return false;
      };

      if (checkDuplicate(this.datajob[0], newName)) {
        this.nameExistsWarning = true;
        this.$message.error("节点名称已存在");
        return;
      }

      const newChild = {
        id: id++,
        label: newName,
        children: [],
      };

      // 如果currentNodeData没有children属性，则初始化为空数组
      if (!this.currentNodeData.children) {
        this.$set(this.currentNodeData, "children", []);
      }
      this.currentNodeData.children.push(newChild);
      const folder_path = "/u1/GeoEast/ieco1.6.2/libso/batp/mod";

      // 后端添加
      axios
        .post("/add-new-file/", {
          folder_path: folder_path,
          file_name: newName, // Include the file name in the request
        })
        .then((response) => {
          this.lf.render(response.data);
          this.addNodeDialogVisible = false; // 关闭添加节点对话框

          this.currentFile.name = newName;
          this.currentFile.path = folder_path; // 根据实
          this.$message.success("节点添加成功");
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },

    remove(node, nodeData) {
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === nodeData.id);

          // 获取需要删除的节点信息
          const file_name = children[index].label;
          const folder_path = "/u1/GeoEast/ieco1.6.2/libso/batp/mod";

          console.log(file_name);

          // 发送删除请求到后端
          axios
            .post("/delete-job/", { file_name: file_name, folder_path: folder_path })
            .then((response) => {
              if (response.data.success) {
                // 后端删除成功后更新前端状态
                children.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败: " + (response.data.error || "未知错误"),
                });
              }
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message:
                  "删除失败: " +
                    (error.response &&
                      error.response.data &&
                      error.response.data.error) || error.message,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    edit(node, nodeData) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === nodeData.id);
      const jobname = parent.data.children[index].label;
      // console.log(parent.data.children[index].label);
      const folder_path = "/u1/GeoEast/ieco1.6.2/libso/batp/mod";
      this.currentFile.name = jobname;
      this.currentFile.path = folder_path; // 根据实际路径修改

      this.$_LfEvent();

      axios
        .post("/xml-to-json/", {
          folder_path: folder_path,
          file_name: jobname, // Include the file name in the request
        })
        .then((response) => {
          this.lf.render(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },

    filterNode(value, nodeData) {
      if (!value) return true;
      return nodeData.label.indexOf(value) !== -1;
    },

    $_initLf() {
      // 画布配置
      const lf = new LogicFlow({
        ...this.config,
        plugins: [Menu, MiniMap, Snapshot],
        container: this.$refs.container,
      });
      this.lf = lf;
      // 设置主题
      lf.setTheme({
        circle: {
          stroke: "#000000",
          strokeWidth: 1,
          outlineColor: "#88f",
        },
        rect: {
          outlineColor: "#88f",
          strokeWidth: 1,
        },
        polygon: {
          strokeWidth: 1,
        },
        polyline: {
          stroke: "#000000",
          hoverStroke: "#000000",
          selectedStroke: "#000000",
          outlineColor: "#88f",
          strokeWidth: 1,
        },
        nodeText: {
          color: "#000000",
        },
        edgeText: {
          color: "#000000",
          background: {
            fill: "#f7f9ff",
          },
        },
      });
      this.$_registerNode();
    },
    // 自定义
    $_registerNode() {
      registerStart(this.lf);
      registerUser(this.lf);
      registerEnd(this.lf);
      registerPush(this.lf, this.clickPlus, this.mouseDownPlus);
      registerDownload(this.lf);
      registerGeoDiskIn(this.lf);
      registerGeoDiskOut(this.lf);
      registerStacking(this.lf);
      registerTakegatherattri(this.lf);
      registerCumtbWeb(this.lf);
      registerChannelMerge(this.lf);
      registerPolyline(this.lf);
      registerTask(this.lf);
      registerConnect(this.lf);
      this.$_render();
    },
    $_render() {
      this.lf.render(demoData);
      this.$_LfEvent();
    },
    $_getData() {
      const data = this.lf.getGraphData();
      console.log(JSON.stringify(data));
    },
    $_LfEvent() {
      this.lf.on("node:click", ({ data }) => {
        console.log("node:click", data);
        this.$data.clickNode = data;
        this.$data.dialogVisible = true;
      });
      this.lf.on("edge:click", ({ data }) => {
        console.log("edge:click", data);
        this.$data.clickNode = data;
        this.$data.dialogVisible = true;
      });
      this.lf.on("element:click", () => {
        this.hideAddPanel();
      });
      this.lf.on("edge:add", ({ data }) => {
        console.log("edge:add", data);
      });
      this.lf.on("node:mousemove", ({ data }) => {
        console.log("node:mousemove");
        this.moveData = data;
      });
      this.lf.on("blank:click", () => {
        this.hideAddPanel();
      });
      this.lf.on("connection:not-allowed", (data) => {
        this.$message({
          type: "error",
          message: data.msg,
        });
      });
      this.lf.on("node:mousemove", () => {
        console.log("on mousemove");
      });
    },
    clickPlus(e, attributes) {
      e.stopPropagation();
      console.log("clickPlus", e, attributes);
      const { clientX, clientY } = e;
      console.log(clientX, clientY);
      this.$data.addPanelStyle.top = clientY - 40 + "px";
      this.$data.addPanelStyle.left = clientX + "px";
      this.$data.showAddPanel = true;
      this.$data.addClickNode = attributes;
    },
    mouseDownPlus(e, attributes) {
      e.stopPropagation();
      console.log("mouseDownPlus", e, attributes);
    },
    hideAddPanel() {
      this.$data.showAddPanel = false;
      this.$data.addPanelStyle.top = 0;
      this.$data.addPanelStyle.left = 0;
      this.$data.addClickNode = null;
    },
    closeDialog() {
      this.$data.dialogVisible = false;
    },
    $_catData() {
      this.$data.graphData = this.$data.lf.getGraphData();
      this.$data.dataVisible = true;
    },
    goto() {
      this.$router.push("/TurboAdpter");
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

.logic-flow-view {
  height: 90vh;
  position: relative;
}
.demo-title {
  text-align: center;
  margin: 20px;
}
.demo-view {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 2;
  color: rgb(0, 205, 102);
}
.demo-control {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 2;
}

#LF-view {
  /* margin: 0; */
  /* width: calc(100% - 100px); */
  height: 98%;
  outline: none;
  /* margin-left: 50px; */
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}

@keyframes lf_animate_dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>

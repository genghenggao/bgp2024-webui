<template>
  <div>
    <el-container style="height: 100vh">
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#113c6b"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">地震作业Web编辑器</el-menu-item>
          <el-submenu index="2">
            <template slot="title">GeoEast</template>
            <el-menu-item index="2-1">IECO</el-menu-item>
            <el-menu-item index="2-2">PYQT</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"
            ><a href="http://ieco.upc.edu.cn/main.htm">BGP2024</a></el-menu-item
          >
        </el-menu>
      </el-header>
      <el-container style="flex: 1; overflow: hidden">
        <el-aside
          width="300px"
          style="overflow-y: auto; display: flex; flex-direction: column"
        >
          <!-- Job作业 -->
          <div style="flex: 1; overflow-y: auto" class="custom-scrollbar">
            <div class="fixed-search-bar">
              <el-input placeholder="输入关键字查询" v-model="filterText">
                <template slot="prepend">作业检索</template>
              </el-input>
            </div>
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
                  <el-button type="text" v-if="data.role" @click="() => upload(data)">
                    <i class="el-icon-upload2"></i>
                  </el-button>
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
            <!-- 新建对话框 -->
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
            <!-- 上传对话框 -->
            <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" width="500px">
              <input type="file" @change="handleFileUpload" />
              <span slot="footer" class="dialog-footer">
                <el-button @click="uploadDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmUpload">确定</el-button>
              </span>
            </el-dialog>
          </div>

          <div style="height: 1px; background-color: #e0e0e0"></div>
          <!-- Module模块 -->
          <div style="flex: 1; overflow-y: auto" class="custom-scrollbar">
            <div class="fixed-search-bar">
              <el-input placeholder="输入关键字查询" v-model="filterModule">
                <template slot="prepend">模块检索</template>
              </el-input>
            </div>
            <el-tree
              :data="moduledata"
              show-checkbox
              node-key="id"
              default-expand-all
              ref="moduleTree"
              :props="moduleProps"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    v-if="!data.role"
                    @click="() => removeModule(node, data)"
                  >
                    <i class="el-icon-minus"></i>
                  </el-button>
                  <el-button
                    type="text"
                    v-if="!data.role"
                    @click="() => addModule(node, data)"
                  >
                    <i class="el-icon-plus"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-aside>
        <el-main style="padding: 0; overflow-y: hidden">
          <div class="logic-flow-view" style="height: 100%">
            <el-row>
              <el-col :span="4">
                <div class="demo-view">
                  <p>
                    <i class="el-icon-s-data"></i>正在编辑的文件: {{ currentFile.name }}
                  </p>
                </div>
              </el-col>
              <el-col :span="10">
                <Control
                  class="demo-control"
                  v-if="lf"
                  :lf="lf"
                  @catData="$_catData"
                  :folder-path="currentFile.path"
                  :file-name="currentFile.name"
                ></Control>
              </el-col>
            </el-row>
            <NodePanel v-if="lf" :lf="lf" :nodeList="nodeList"></NodePanel>
            <div id="LF-view" ref="container" style="height: 100%"></div>
            <AddPanel
              v-if="showAddPanel"
              class="add-panel"
              :style="addPanelStyle"
              :lf="lf"
              :nodeData="addClickNode"
              @addNodeFinish="hideAddPanel"
            ></AddPanel>
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
            <el-dialog title="数据" :visible.sync="dataVisible" width="50%">
              <DataDialog :graphData="graphData"></DataDialog>
            </el-dialog>
          </div>
        </el-main>
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
    filterModule(val) {
      this.$refs.moduleTree.filter(val);
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
    const moduledata = [
      {
        id: 0,
        label: "模块节点",
        role: true,
        children: [
          {
            id: 1,
            label: "模块一",
            role: false,
          },
          {
            id: 2,
            label: "模块二",
            role: false,
          },
        ],
      },
    ];

    return {
      jobFiles: [],
      activeIndex: "1",
      filterText: "",
      filterModule: "",
      datajob: JSON.parse(JSON.stringify(datajob)),
      moduledata: JSON.parse(JSON.stringify(moduledata)),
      currentFile: { name: "", path: "" },
      defaultProps: {
        children: "children",
        label: "label",
      },
      moduleProps: {
        children: "children",
        label: "label",
      },
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
      uploadDialogVisible: false, // 上传对话框可见性
      selectedFile: null, // 选中的文件
      currentNodeData: null, // 当前节点数据
    };
  },

  mounted() {
    this.$_initLf();
    this.getjobfilelist();
    this.getmodulefilelist();
    this.loadFirstJobFile();
  },
  methods: {
    // 加载job列表
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
    // 加载module列表
    getmodulefilelist() {
      axios
        .get("/module-files/")
        .then((response) => {
          this.children = response.data.children;
          // console.log(this.datajob[0].children);
          this.moduledata[0].children = response.data.children;
        })
        .catch((error) => {
          console.error("Error fetching job files:", error);
        });
    },

    loadFirstJobFile() {
      // 加载示例文件
      if (
        (this.datajob[0] &&
          this.datajob[0].children &&
          this.datajob[0].children.length > 0,
        this.moduledata[0] &&
          this.moduledata[0].children &&
          this.moduledata[0].children.length > 0)
      ) {
        const firstFile = this.datajob[0].children[0];
        const jobname = firstFile.label;
        this.currentFile.name = jobname;
      }
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // 添加节点
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

    // 上传
    upload(nodeData) {
      this.selectedFile = null; // 清空选中文件
      this.uploadDialogVisible = true; // 显示上传对话框

      // 保存当前节点数据
      this.currentNodeData = nodeData;
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    confirmUpload() {
      if (!this.selectedFile) {
        this.$message.error("请选择一个文件");
        return;
      }

      const fileName = this.selectedFile.name;

      // 检查文件名是否以 .job 结尾
      if (!fileName.endsWith(".job")) {
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

      if (checkDuplicate(this.datajob[0], fileName)) {
        this.$message.error("节点名称已存在");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      // 后端处理
      axios
        .post("/upload-file/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const jsonData = response.data; // 假设后端返回解析后的JSON数据

          const newChild = {
            id: this.datajob.length + 1,
            label: fileName,
            children: jsonData.children || [],
          };

          // 如果currentNodeData没有children属性，则初始化为空数组
          if (!this.currentNodeData.children) {
            this.$set(this.currentNodeData, "children", []);
          }
          this.currentNodeData.children.push(newChild);

          this.uploadDialogVisible = false; // 关闭上传对话框
          this.$message.success("文件上传成功");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          this.$message.error("文件上传失败");
        });
    },

    // 删除节点
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

    addModule(nodeData) {
      if (this.nodeList.some((module) => module.text === nodeData.label)) {
        this.$message.error("面板中已存在该功能模块");
        return;
      }
      const add_module = {
        text: nodeData.label,
        type: nodeData.label,
        class: "node-" + nodeData.label,
      };
      this.nodeList.push(add_module);
    },

    removeModule(node, nodeData) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === nodeData.id);
      if (index !== -1) {
        const jobname = parent.data.children[index].label;
        const nodeListIndex = this.nodeList.findIndex((node) => node.text === jobname);
        if (nodeListIndex !== -1) {
          this.nodeList.splice(nodeListIndex, 1);
        } else {
          this.$message.error("面板中不存在该功能模块");
        }
      } else {
        console.log(`Node with id ${nodeData.id} not found.`);
      }
    },
    // 编辑修改
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
  .el-menu-demo a {
    text-decoration: none; /* 去掉链接的下划线 */
  }
}
.el-main {
  padding: 0 !important;
  height: 100%;
}
.el-aside {
  height: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.fixed-search-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  padding: 0 0 10px 0;
}
.logic-flow-view {
  height: 100%;
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
  height: 100%;
  outline: none;
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

/* Custom scrollbar styles */
.custom-scrollbar {
  scrollbar-width: none; /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* For WebKit browsers */
}
</style>

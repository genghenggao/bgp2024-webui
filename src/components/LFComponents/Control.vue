<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-20 11:05:26
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-28 19:37:19
-->
<template>
  <div>
    <el-button-group>
      <el-button type="plain" size="small" @click="$_zoomIn">放大</el-button>
      <el-button type="plain" size="small" @click="$_zoomOut">缩小</el-button>
      <el-button type="plain" size="small" @click="$_zoomReset">大小适应</el-button>
      <el-button type="plain" size="small" @click="$_translateRest">定位还原</el-button>
      <el-button type="plain" size="small" @click="$_reset">还原(大小&定位)</el-button>
      <el-button type="plain" size="small" @click="$_undo" :disabled="undoDisable"
        >上一步(ctrl+z)</el-button
      >
      <el-button type="plain" size="small" @click="$_redo" :disabled="redoDisable"
        >下一步(ctrl+y)</el-button
      >
      <el-button type="plain" size="small" @click="$_download">下载图片</el-button>
      <el-button type="plain" size="small" @click="$_downloadxml">下载Job</el-button>
      <el-button type="plain" size="small" @click="$_catData">查看数据</el-button>
      <el-button v-if="catTurboData" type="plain" size="small" @click="$_catTurboData"
        >查看turbo数据</el-button
      >
      <el-button type="plain" size="small" @click="$_submitJob">提交作业</el-button>
      <el-button type="plain" size="small" @click="$_showMiniMap">查看缩略图</el-button>
    </el-button-group>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
import xmlbuilder from "xmlbuilder";

export default {
  name: "Control",
  props: {
    lf: Object || String,
    catTurboData: Boolean,
    folderPath: String,
    fileName: String,
    currentSettings: Object || String,
  },
  data() {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
      selectedFile: null,
    };
  },
  mounted() {
    this.$props.lf.on("history:change", ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble;
      this.$data.redoDisable = !redoAble;
    });
  },
  methods: {
    $_zoomIn() {
      this.$props.lf.zoom(true);
    },
    $_zoomOut() {
      this.$props.lf.zoom(false);
    },
    $_zoomReset() {
      this.$props.lf.resetZoom();
    },
    $_translateRest() {
      this.$props.lf.resetTranslate();
    },
    $_reset() {
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo() {
      this.$props.lf.undo();
    },
    $_redo() {
      this.$props.lf.redo();
    },
    $_download() {
      this.$props.lf.getSnapshot();
    },
    $_catData() {
      this.$emit("catData");
    },
    $_submitJob() {
      const submitjob = this.$props.lf.getGraphData();
      Object.assign(submitjob, this.currentSettings);
      axios
        .post("/json-to-xml/", {
          folder_path: this.folderPath, // 使用传递过来的folder_path
          file_name: this.fileName, // 使用传递过来的file_name
          data_json: submitjob,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      this.$message({
        message: "恭喜你，作业提交成功！",
        type: "success",
      });
    },
    $_catTurboData() {
      this.$emit("catTurboData");
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 150, 40);
    },
    // json导出xml
    jsonToXml(jsonData) {
      const root = xmlbuilder
        .create("JOB", { version: "1.0", encoding: "UTF-8" })
        .att("VERSION", "2.0");

      // Process nodes
      jsonData.nodes.forEach((node) => {
        const module = root.ele("MOUDLE", {
          status: "true",
          name: node.type.charAt(0).toUpperCase() + node.type.slice(1),
          VERSION: "1.01",
        });
        Object.entries(node.properties).forEach(([key, value]) => {
          const formattedKey = key.replace(/_/g, " ");
          module
            .ele("PARAMETER", {
              VALID: "TRUE",
              name: formattedKey,
              uiname: formattedKey,
              tag: "TRUE",
            })
            .text(value);
        });
      });

      // Add JOBINFORMATION section
      const jobInfo = root.ele("JOBINFORMATION");
      jobInfo.ele("PROJECT").text("BGPCUP2024");
      jobInfo.ele("SURVEY").text("process4-vsp-rtm");
      jobInfo.ele("LINE");
      jobInfo.ele("USER");
      jobInfo.ele("HOSTNAME");
      jobInfo.ele("DBNAME").text("ndp_BGPCup");
      jobInfo.ele("DBUSER");
      jobInfo.ele("DBPWD");

      // Add VARDEFINE section
      const varDefine = root.ele("VARDEFINE", { TYPE: "Cross Unit", ITERATOR: "1" });
      const colHeader = varDefine.ele("COLHEADER");
      colHeader
        .ele("VARCOL", { VARTYPE: "VARIABLE", TYPE: "String", DEFVALUE: "" })
        .text("_UNIT_1234_LINE");
      colHeader
        .ele("VARCOL", { VARTYPE: "VARIABLE", TYPE: "String", DEFVALUE: "" })
        .text("Job Name");
      const varTable = varDefine.ele("VARTABLE");
      const row = varTable.ele("ROW");
      row.ele("COL");
      row.ele("COL");

      // Create a dictionary for quick node lookup by ID
      const nodeIdMap = {};
      jsonData.nodes.forEach((node, idx) => {
        nodeIdMap[node.id] = idx + 1;
      });

      // Process edges and add PLOT section
      const plot = root.ele("PLOT");
      jsonData.nodes.forEach((node, idx) => {
        const pom = plot.ele("POM", { IDX: String(idx + 1), ID: String(idx + 1) });
        const rect = pom.ele("RECT");
        rect.ele("X").text(node.x);
        rect.ele("Y").text(node.y);

        // Find edges where the current node is the target
        const prevEdges = jsonData.edges.filter((edge) => edge.targetNodeId === node.id);
        if (prevEdges.length > 0) {
          const prev = pom.ele("PREV");
          prevEdges.forEach((edge) => {
            const prevNodeIdx = nodeIdMap[edge.sourceNodeId];
            prev.ele("ITEM", { CHANNLE: "0", ID: String(prevNodeIdx) }).text("0");
          });
        }
      });

      const xmlString = root.end({ pretty: true });
      return xmlString;
    },
    $_downloadxml() {
      const jsonData = this.$props.lf.getGraphData();
      const xmlString = this.jsonToXml(jsonData);
      // Create a Blob from the XML string
      const blob = new Blob([xmlString], { type: "application/xml" });
      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "seisweb.job";
      document.body.appendChild(link);
      link.click();

      // Clean up the link element
      document.body.removeChild(link);
    },
  },
};
</script>
<style scoped></style>

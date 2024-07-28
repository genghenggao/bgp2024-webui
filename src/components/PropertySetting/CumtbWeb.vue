<template>
  <div>
    <el-form
      ref="formRef"
      label-width="160px"
      :model="formData"
      label-position="left"
    >
      <div class="form-container">
        <el-form-item label="ExecModel" prop="ExecModel" required>
          <el-select
            v-model="formData.ExecModel"
            placeholder="请选择类型"
            style="width: 100%"
            filterable
            allow-create
          >
            <el-option label="python" value="python"></el-option>
            <el-option label="java" value="java"></el-option>
            <el-option label="javascript" value="javascript"></el-option>
            <el-option label="executable" value="executable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PyScriptFile" prop="PyScriptFile" required>
          <el-input v-model="formData.PyScriptFile" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="ExecutableFile" prop="ExecutableFile">
          <el-input v-model="formData.ExecutableFile" style="width: 100%"></el-input>
        </el-form-item>
      </div>

      <div class="description-container">
        <p>Descriptions:</p>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formData.Description"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CumtbWeb",
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  mounted() {
    const { properties, text } = this.$props.nodeData;
    if (properties) {
      this.$data.formData = Object.assign({}, this.$data.formData, properties);
    }
    if (text && text.value) {
      this.$data.formData.text = text.value;
    }
    if (text && text.value) {
      this.$data.text = text.value;
    }
  },
  data() {
    return {
      text: "",
      formData: {
        ExecModel: "python",
        PyScriptFile: "/home/geoeast/cumtb/cumtbweb/py/worker.py",
        ExecutableFile: "",
        Description: "Custom Python processing module",
      },
      rules: {
        ExecModel: [{ required: true, message: "请选择语言", trigger: "change" }],
        PyScriptFile: [{ required: true, message: "请输入脚本文件", trigger: "blur" }],
      },
      activeNames: ["1"], // 默认展开第一类
    };
  },
  computed: {
    isAutoFile() {
      return this.formData.OutputFileType === "Auto file";
    },
    isSingleFile() {
      return this.formData.OutputFileType === "Single file";
    },
    isMultiFile() {
      return this.formData.OutputFileType === "Multi file";
    },
  },
  methods: {
    onSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 提交表单
          // console.log("提交成功:", this.formData);
          const { id } = this.$props.nodeData;
          this.$props.lf.setProperties(id, {
            ...this.$data.formData,
          });
          this.$props.lf.updateText(id, this.$data.formData.text);
          this.$emit("onClose");
        } else {
          // console.log("提交失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.form-container {
  height: 70vh;
  overflow-y: auto;
  scrollbar-width: none;
  .el-collapse-item__header {
    font-size: 16px;
    color: rgb(69, 98, 226);
  }
}
</style>

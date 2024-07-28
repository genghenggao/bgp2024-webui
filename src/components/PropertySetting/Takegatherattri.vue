<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="文件名称">
        <el-input v-model="formData.filename"></el-input>
      </el-form-item>
      <el-form-item label="输出选择">
        <el-input v-model="formData.filetype"></el-input>
      </el-form-item>
      <el-form-item label="道集类型">
        <el-select v-model="formData.gatherflag" placeholder="请选择" style="width: 100%">
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Receiver" value="Receiver"></el-option>
          <el-option label="user defined" value="user defined"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Takegatherattri",
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
        filename: "",
        filetype: "",
        gatherflag: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const { id } = this.$props.nodeData;
      this.$props.lf.setProperties(id, {
        ...this.$data.formData,
      });
      console.log(6666, this.$data.formData);
      this.$props.lf.updateText(id, this.$data.formData.text);
      this.$emit("onClose");
    },
  },
};
</script>
<style scoped>
/* .el-form-item__label-wrap {
  margin-left: 0px !important;
} */
</style>

<template>
  <div>
    <el-form label-width="90px" :model="formData">
      <el-form-item label="执行语言">
        <el-select v-model="formData.execmodel" placeholder="请选择" style="width: 100%;">
          <el-option label="python" value="python"></el-option>
          <el-option label="java" value="java"></el-option>
          <el-option label="javascript" value="javascript"></el-option>
          <el-option label="executable" value="executable"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件路径">
        <el-input v-model="formData.pyscriptfile" style="width: 100%;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
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
        execmodel: "",
        pyscriptfile: "",
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
.el-form-item__label-wrap {
  margin-left: 0px !important;
}
</style>

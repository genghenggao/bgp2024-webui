<template>
  <div>
    <el-form label-width="140px" :model="formData">
      <el-form-item label="叠加方法">
        <el-select
          v-model="formData.stackmethod"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="Nomal" value="Nomal"></el-option>
          <el-option
            label="without noise factor"
            value="without noise factor"
          ></el-option>
          <el-option label="with noise factor" value="with noise factor"></el-option>
          <el-option label="amplitude preserved" value="amplitude preserved"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道集标类型">
        <el-select v-model="formData.gatherflag" placeholder="请选择" style="width: 100%">
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="偏移权重">
        <el-input v-model="formData.offsetweight" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Stacking",
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
        stackmethod: "",
        gatherflag: "",
        offsetweight: "",
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

<template>
  <div>
    <el-form label-width="90px" :model="formData">
      <el-form-item label="输出类型">
        <el-select v-model="formData.outputtype" placeholder="请选择" style="width: 100%">
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名称">
        <el-input v-model="formData.filename"></el-input>
      </el-form-item>
      <el-form-item label="地震道">
        <el-input v-model="formData.seismicset"></el-input>
      </el-form-item>
      <el-form-item label="数据形式">
        <el-select v-model="formData.dataform" placeholder="请选择" style="width: 100%">
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="域类型">
        <el-select v-model="formData.domaintype" placeholder="请选择" style="width: 100%">
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据属性">
        <el-select
          v-model="formData.dataattribute"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报表类型">
        <el-select
          v-model="formData.reporttable"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="覆盖文件">
        <el-select
          v-model="formData.reportedfilename"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="Job abort" value="Job abort"></el-option>
          <el-option label="Override file" value="Override file"></el-option>
          <el-option
            label="Override file enforceable"
            value="Override file enforceable "
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="振幅极值">
        <el-select
          v-model="formData.amplitudeextremum"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时窗输出">
        <el-input v-model="formData.timewindowoutput"></el-input>
      </el-form-item>
      <el-form-item label="其他索引">
        <el-select v-model="formData.otherindex" placeholder="请选择" style="width: 100%">
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据格式">
        <el-select v-model="formData.dataformat" placeholder="请选择" style="width: 100%">
          <el-option
            label="IEEE float point(IEEE)"
            value="IEEE float point(IEEE)"
          ></el-option>
          <el-option
            label="Float optimization(opt)"
            value="Float optimization(opt)"
          ></el-option>
          <el-option label="16bit-interger(SPI)" value="16bit-interger(SPI)"></el-option>
          <el-option label="8bit-interger(SPI)" value="8bit-interger(SPI)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存储类型">
        <el-select
          v-model="formData.storagetype"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="Auto" value="Auto"></el-option>
          <el-option label="NAS" value="NAS"></el-option>
          <el-option label="HDFS" value="HDFS"></el-option>
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
  name: "GeoDiskOut",
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
        outputtype: "Single file",
        filename: "",
        seismicset: "",
        dataform: "Original",
        domaintype: "Original",
        dataattribute: "1 Seismic record",
        reporttable: "No",
        reportedfilename: "Override file enforceable",
        amplitudeextremum: "No",
        timewindowoutput: 0.0,
        dataformat: "IEEE float point(IEEE)",
        otherindex: "No",
        storagetype: "Auto",
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

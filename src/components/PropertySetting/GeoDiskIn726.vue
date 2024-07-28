<template>
  <div>
    <el-form label-width="90px" :model="formData">
      <el-form-item label="Filename">
        <el-input v-model="formData.Filename"></el-input>
      </el-form-item>
      <el-form-item label="FirstKeywordCode">
        <el-select
          v-model="formData.FirstKeywordCode"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="FirstKeywordRange">
        <el-input v-model="formData.FirstKeywordRange"></el-input>
      </el-form-item>
      <el-form-item label="SecondKeywordCode">
        <el-select
          v-model="formData.SecondKeywordCode"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SecondKeywordRange">
        <el-input v-model="formData.SecondKeywordRange"></el-input>
      </el-form-item>
      <el-form-item label="ThirdKeywordCode">
        <el-select
          v-model="formData.ThirdKeywordCode"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ThirdKeywordRange">
        <el-input v-model="formData.ThirdKeywordRange"></el-input>
      </el-form-item>
      <el-form-item label="FourthKeywordCode">
        <el-select
          v-model="formData.FourthKeywordCode"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" FourthKeywordRange">
        <el-input v-model="formData.FourthKeywordRange"></el-input>
      </el-form-item>
      <el-form-item label="FifthKeywordCode">
        <el-select
          v-model="formData.FifthKeywordCode"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="FifthKeywordRange">
        <el-input v-model="formData.FifthKeywordRange"></el-input>
      </el-form-item>
      <el-form-item label="GatherFlag">
        <el-select
          v-model="formData.GatherFlag"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="Source" value="Source"></el-option>
          <el-option label="Trace" value="Trace"></el-option>
          <el-option label="CMP" value="CMP"></el-option>
          <el-option label="Offset" value="Offset"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tracetype">
        <el-select
          v-model="formData.Tracetype"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="-1 Other trace" value="-1 Other trace"></el-option>
          <el-option label="1 Valid tracee" value="1 Valid trace"></el-option>
          <el-option label="2 Dead trace" value="2 Dead trace"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="UseSameRangeForAllFiles">
        <el-select
          v-model="formData.UseSameRangeForAllFiles"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="TimeWindowInput">
        <el-input v-model="formData.TimeWindowInput"></el-input>
      </el-form-item>
      <el-form-item label="SelectHeaderWord">
        <el-input v-model="formData.SelectHeaderWord"></el-input>
      </el-form-item>
      <el-form-item label="SelectHeaderRange">
        <el-input v-model="formData.SelectHeaderRange"></el-input>
      </el-form-item>
      <el-form-item label="RandomSelectKeyword">
        <el-input v-model="formData.RandomSelectKeyword"></el-input>
      </el-form-item>
      <el-form-item label="RandomSelectRange">
        <el-input v-model="formData.RandomSelectRange"></el-input>
      </el-form-item>
      <el-form-item label="GatherInput">
        <el-select
          v-model="formData.GatherInput"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GatherInputTraces">
        <el-input v-model="formData.GatherInputTraces"></el-input>
      </el-form-item>
      <el-form-item label="RecreateIndex">
        <el-select
          v-model="formData.RecreateIndex"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="HeaderOnly">
        <el-select
          v-model="formData.HeaderOnly"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="No" value="No"></el-option>
          <el-option label="Yes" value="Yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SortSequence">
        <el-input v-model="formData.SortSequence"></el-input>
      </el-form-item>
      <el-form-item label="HeadInconsistencyCheck">
        <el-input v-model="formData.HeadInconsistencyCheck"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "GeoDiskIn",
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
        Filename: "",
        FirstKeywordCode: "Source",
        FirstKeywordRange: 0,
        SecondKeywordCode: "Trace",
        SecondKeywordRange: 0,
        ThirdKeywordCode: "Null",
        ThirdKeywordRange: 0,
        FourthKeywordCode: "Null",
        FourthKeywordRange: 0,
        FifthKeywordCode: "Null",
        FifthKeywordRange: 0,
        GatherFlag: "Source",
        Tracetype: "1 Valid trace",
        UseSameRangeForAllFiles: "No",
        TimeWindowInput: 0.0,
        SelectHeaderWord: "Null",
        SelectHeaderRange: 0.0,
        RandomSelectKeyword: "Null",
        RandomSelectRange: -9999,
        GatherInput: "No",
        GatherInputTraces: "",
        RecreateIndex: "No",
        HeaderOnly: "No",
        SortSequence: "False",
        HeadInconsistencyCheck: "File Input during GeoEast progress",
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
<style scoped></style>

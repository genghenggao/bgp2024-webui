<template>
  <div>
    <el-form ref="formRef" label-width="160px" :model="formData" label-position="left">
      <div class="form-container">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="General Parameters" name="1">
            <el-form-item label="Filename" prop="Filename" required>
              <el-input v-model="formData.Filename"></el-input>
            </el-form-item>
            <el-form-item label="First_keyword_code">
              <el-select
                v-model="formData.First_keyword_code"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="First_keyword_range">
              <el-input v-model="formData.First_keyword_range"></el-input>
            </el-form-item>
            <el-form-item label="Second_keyword_code">
              <el-select
                v-model="formData.Second_keyword_code"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Second_keyword_range">
              <el-input v-model="formData.Second_keyword_range"></el-input>
            </el-form-item>
            <el-form-item label="Third_keyword_code">
              <el-select
                v-model="formData.Third_keyword_code"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Third_keyword_range">
              <el-input v-model="formData.Third_keyword_range"></el-input>
            </el-form-item>
            <el-form-item label="Fourth_keyword_code">
              <el-select
                v-model="formData.Fourth_keyword_code"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" Fourth_keyword_range">
              <el-input v-model="formData.Fourth_keyword_range"></el-input>
            </el-form-item>
            <el-form-item label="Fifth_keyword_code">
              <el-select
                v-model="formData.Fifth_keyword_code"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Fifth_keyword_range">
              <el-input v-model="formData.Fifth_keyword_range"></el-input>
            </el-form-item>
            <el-form-item label="Gather_flag">
              <el-select
                v-model="formData.Gather_flag"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Null" value="Null"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Trace" value="Trace"></el-option>
                <el-option label="CMP line" value="CMP line"></el-option>
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="Offset" value="Offset"></el-option>
                <el-option label="Receive line" value="Receive line"></el-option>
                <el-option label="Receive station" value="Receive station"></el-option>
                <el-option label="Source line" value="Source line"></el-option>
                <el-option label="Source station" value="Source station"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Trace_type">
              <el-select
                v-model="formData.Trace_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="-1 Other trace" value="-1 Other trace"></el-option>
                <el-option label="1 Valid tracee" value="1 Valid trace"></el-option>
                <el-option label="2 Dead trace" value="2 Dead trace"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Use_same_range_for_all_files">
              <el-select
                v-model="formData.Use_same_range_for_all_files"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Time_window_input">
              <el-input v-model="formData.Time_window_input"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Further Select Parameters" name="2">
            <el-form-item label="Select_header_word">
              <el-input v-model="formData.Select_header_word"></el-input>
            </el-form-item>
            <el-form-item label="Select_header_range">
              <el-input v-model="formData.Select_header_range"></el-input>
            </el-form-item>
            <el-form-item label="Random_select_keyword">
              <el-input v-model="formData.Random_select_keyword"></el-input>
            </el-form-item>
            <el-form-item label="Random_select_range">
              <el-input v-model="formData.Random_select_range"></el-input>
            </el-form-item>
            <el-form-item label="Gather_input">
              <el-select
                v-model="formData.Gather_input"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Auxiliary Parameters" name="3">
            <el-form-item label="Gather_input_tarces">
              <el-input v-model="formData.Gather_input_tarces"></el-input>
            </el-form-item>
            <el-form-item label="Recreate_index">
              <el-select
                v-model="formData.Recreate_index"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Header_only">
              <el-select
                v-model="formData.Header_only"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Sort_sequence">
              <el-input v-model="formData.Sort_sequence"></el-input>
            </el-form-item>
            <el-form-item label="Head_inconsistency_check">
              <el-input v-model="formData.Head_inconsistency_check"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
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
        Filename: "DS32-3-vel-head,Null,process4-vsp-rtm,BGPCUP2024",
        First_keyword_code: "Source",
        First_keyword_range: 0,
        Second_keyword_code: "Trace",
        Second_keyword_range: 0,
        Third_keyword_code: "Null",
        Third_keyword_range: 0,
        Fourth_keyword_code: "Null",
        Fourth_keyword_range: 0,
        Fifth_keyword_code: "Null",
        Fifth_keyword_range: 0,
        Gather_flag: "Source",
        Trace_type: "1 Valid trace",
        Use_same_range_for_all_files: "No",
        Time_window_input: 0.000000,
        Select_header_word: "Null",
        Select_header_range: 0.000000,
        Random_select_keyword: "Null",
        Random_select_range: -9999,
        Gather_input: "No",
        Gather_input_tarces: "10000",
        Recreate_index: "No",
        Header_only: "No",
        Sort_sequence: "False,False,False,False,False",
        Head_inconsistency_check: "",
        Description: "File Input during GeoEast progress",
      },
      rules: {
        Filename: [{ required: true, message: "请输入文件名", trigger: "blur" }],
      },
      activeNames: ["1"], // 默认展开第一类
    };
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

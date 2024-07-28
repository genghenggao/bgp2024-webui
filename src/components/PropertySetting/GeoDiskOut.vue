<template>
  <div>
    <el-form ref="formRef" label-width="160px" :model="formData" label-position="left">
      <div class="form-container">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="General Parameters" name="1">
            <el-form-item label="Output_file_type" prop="Output_file_type" required>
              <el-select
                v-model="formData.Output_file_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Single file" value="Single file"></el-option>
                <el-option label="Multi file" value="Multi file"></el-option>
                <el-option label="Auto file" value="Auto file"></el-option>
              </el-select>
            </el-form-item>

            <template v-if="isAutoFile">
              <el-form-item label="Auto_Filename">
                <el-input v-model="formData.Auto_Filename"></el-input>
              </el-form-item>
              <el-form-item label="Auto_filename_range">
                <el-input v-model="formData.Auto_filename_range"></el-input>
              </el-form-item>
            </template>

            <template v-if="isSingleFile">
              <el-form-item label="Filename">
                <el-input v-model="formData.Filename"></el-input>
              </el-form-item>
            </template>

            <template v-if="isMultiFile">
              <el-form-item label="MultFilename">
                <el-input v-model="formData.MultFilename"></el-input>
              </el-form-item>
              <el-form-item label="Output_header_word">
                <el-input v-model="formData.Output_header_word"></el-input>
              </el-form-item>
              <el-form-item label="Output_header_range">
                <el-input v-model="formData.Output_header_range"></el-input>
              </el-form-item>
            </template>

            <el-form-item label="Seismic_set">
              <el-input v-model="formData.Seismic_set"></el-input>
            </el-form-item>
            <el-form-item label="Data_form">
              <el-select
                v-model="formData.Data_form"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Original" value="Original"></el-option>
                <el-option label="2 Pre-stack" value="2 Pre-stack"></el-option>
                <el-option label="1 Post-stack" value="1 Post-stack"></el-option>
                <el-option label="5 Time slice" value="5 Time slice"></el-option>
                <el-option label="6 Arbitrary" value="6 Arbitrary"></el-option>
                <el-option label="11 CDP" value="11 CDP"></el-option>
                <el-option label="12 OVT" value="12 OVT"></el-option>
                <el-option label="13 VSP" value="13 VSP"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Domain_type">
              <el-select
                v-model="formData.Domain_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Original" value="Original"></el-option>
                <el-option label="1 PP time" value="1 PP time"></el-option>
                <el-option label="5 SS time" value="5 SS time"></el-option>
                <el-option label="6 PS time" value="6 PS time"></el-option>
                <el-option label="2 Depth" value="2 Depth"></el-option>
                <el-option label="3 Velocity" value="3 Velocity"></el-option>
                <el-option label="4 Frequency" value="4 Frequency"></el-option>
                <el-option label="7 Amplitude" value="7 Amplitude"></el-option>
                <el-option label="11 CMP" value="11 CMP"></el-option>
                <el-option label="12 CMP Line" value="12 CMP Line"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Data_attribute">
              <el-select
                v-model="formData.Data_attribute"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="-1 Diverse" value="-1 Diverse"></el-option>
                <el-option label="Original" value="Original"></el-option>
                <el-option label="1 Seismic record" value="1 Seismic record"></el-option>
                <el-option
                  label="2 Wavelet or correlation"
                  value="2 Wavelet or correlation"
                ></el-option>
                <el-option
                  label="3 Energy or amplitude envelope"
                  value="3 Energy or amplitude envelope"
                ></el-option>
                <el-option label="3 Velocity" value="3 Velocity"></el-option>
                <el-option label="4 Velocity scan" value="4 Velocity scan"></el-option>
                <el-option label="5 Frequency scan" value="5 Frequency scan"></el-option>
                <el-option label="6 Phase scan" value="6 Phase scan"></el-option>
                <el-option label="7 Coherence" value="7 Coherence"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Report_table">
              <el-select
                v-model="formData.Report_table"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="No" value="No"></el-option>
                <el-option
                  label="Interval 50 traces"
                  value="Interval 50 traces"
                ></el-option>
                <el-option
                  label="Interval 500 traces"
                  value="Interval 500 traces"
                ></el-option>
                <el-option
                  label="Interval 1000 traces"
                  value="Interval 1000 traces"
                ></el-option>
                <el-option
                  label="Interval 10000 traces"
                  value="Interval 10000 traces"
                ></el-option>
                <el-option label="Gather" value="Gather"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Repeated_filename">
              <el-select
                v-model="formData.Repeated_filename"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Job abort" value="Job abort"></el-option>
                <el-option label="Override file" value="Override file"></el-option>
                <el-option
                  label="Override file enforceable"
                  value="Override file enforceable"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Auxiliary Parameters" name="3">
            <el-form-item label="Amplitude_extremum">
              <el-select
                v-model="formData.Amplitude_extremum"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Time_window_output">
              <el-input v-model="formData.Time_window_output"></el-input>
            </el-form-item>
            <el-form-item label="Create_other_index">
              <el-select
                v-model="formData.Create_other_index"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="No" value="No"></el-option>
                <el-option label="Yes" value="Yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="First_keyword_code">
              <el-input v-model="formData.First_keyword_code"></el-input>
            </el-form-item>
            <el-form-item label="Second_keyword_code">
              <el-input v-model="formData.Second_keyword_code"></el-input>
            </el-form-item>
            <el-form-item label="Third_keyword_code">
              <el-input v-model="formData.Third_keyword_code"></el-input>
            </el-form-item>
            <el-form-item label="Fourth_keyword_code">
              <el-input v-model="formData.Fourth_keyword_code"></el-input>
            </el-form-item>
            <el-form-item label="Fifth_keyword_code">
              <el-input v-model="formData.Fifth_keyword_code"></el-input>
            </el-form-item>
            <el-form-item label="Data_format">
              <el-select
                v-model="formData.Data_format"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option
                  label="IEEE float point(IEEE)"
                  value="IEEE float point(IEEE)"
                ></el-option>
                <el-option
                  label="Float optimization(opt)"
                  value="Float optimization(opt)"
                ></el-option>
                <el-option
                  label="16bit-integer(SPI)"
                  value="16bit-integer(SPI)"
                ></el-option>
                <el-option
                  label="8bit-integer(SBI)"
                  value="8bit-integer(SBI)"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Storage_type">
              <el-select
                v-model="formData.Storage_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="Auto" value="Auto"></el-option>
                <el-option label="NAS" value="NAS"></el-option>
                <el-option label="HDFS" value="HDFS"></el-option>
              </el-select>
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
        Output_file_type: "Single file",
        Filename: "DS32-3-vel-head-test001,Null,process4-vsp-rtm,BGPCUP2024",
        MultFilename: "",
        Auto_Filename: "",
        Output_header_word: "Source",
        Output_header_range: 0,
        Auto_filename_range: 0,
        Seismic_set: "",
        Data_format: "IEEE float point(IEEE)",
        Data_form: "Original",
        Domain_type: "Original",
        Data_attribute: "1 Seismic record",
        Report_table: "No",
        Repeated_filename: "Override file enforceable",
        Time_window_output: "0.000000",
        Create_other_index: "No",
        First_keyword_code: "Source",
        Second_keyword_code: "Null",
        Third_keyword_code: "Null",
        Fourth_keyword_code: "Null",
        Fifth_keyword_code: "Null",
        Amplitude_extremum: "No",
        Storage_type: "Auto",
        Description: "Output During GeoEast Data",
      },
      rules: {
        Output_file_type: [
          { required: true, message: "请选择输出文件类型", trigger: "change" },
        ],
      },
      activeNames: ["1"], // 默认展开第一类
    };
  },
  computed: {
    isAutoFile() {
      return this.formData.Output_file_type === "Auto file";
    },
    isSingleFile() {
      return this.formData.Output_file_type === "Single file";
    },
    isMultiFile() {
      return this.formData.Output_file_type === "Multi file";
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

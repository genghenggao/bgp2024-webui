<template>
  <div>
    <el-form ref="formRef" label-width="160px" :model="formData" label-position="left">
      <div class="form-container">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="General Parameters" name="1">
            <el-form-item label="Resort" prop="Resort" required>
              <el-select
                v-model="formData.Resort"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="no" value="no"></el-option>
                <el-option label="yes" value="yes"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Number_of_Channels">
              <el-input v-model="formData.Number_of_Channels"></el-input>
            </el-form-item>

            <template v-if="isYes">
              <el-form-item label="First_keyword">
                <el-select
                  v-model="formData.First_keyword"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="Null" value="Null"></el-option>
                  <el-option label="Source" value="Trace"></el-option>
                  <el-option label="CMP line" value="CMP line"></el-option>
                  <el-option label="CMP" value="CMP"></el-option>
                  <el-option label="Offest" value="Offset"></el-option>
                  <el-option label="Receiver line" value="Receiver line"></el-option>
                  <el-option
                    label="Receiver station"
                    value="Receiver station"
                  ></el-option>
                  <el-option label="Source line" value="Source line"></el-option>
                  <el-option label="Source station" value="Source station"></el-option>
                  <el-option label="Source X" value="Source X"></el-option>
                  <el-option label="Source Y" value="Source Y"></el-option>
                  <el-option label="Rreceiver X" value="Rreceiver X"></el-option>
                  <el-option label="Rreceiver Y" value="Rreceiver Y"></el-option>
                  <el-option label="CMP X" value="CMP X"></el-option>
                  <el-option label="CMP Y" value="CMP Y"></el-option>
                  <el-option label="OVT" value="OVT"></el-option>
                  <el-option label="Fold" value="Fold"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Second_keyword">
                <el-select
                  v-model="formData.Second_keyword"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="Null" value="Null"></el-option>
                  <el-option label="Source" value="Trace"></el-option>
                  <el-option label="CMP line" value="CMP line"></el-option>
                  <el-option label="CMP" value="CMP"></el-option>
                  <el-option label="Offest" value="Offset"></el-option>
                  <el-option label="Receiver line" value="Receiver line"></el-option>
                  <el-option
                    label="Receiver station"
                    value="Receiver station"
                  ></el-option>
                  <el-option label="Source line" value="Source line"></el-option>
                  <el-option label="Source station" value="Source station"></el-option>
                  <el-option label="Source X" value="Source X"></el-option>
                  <el-option label="Source Y" value="Source Y"></el-option>
                  <el-option label="Rreceiver X" value="Rreceiver X"></el-option>
                  <el-option label="Rreceiver Y" value="Rreceiver Y"></el-option>
                  <el-option label="CMP X" value="CMP X"></el-option>
                  <el-option label="CMP Y" value="CMP Y"></el-option>
                  <el-option label="OVT" value="OVT"></el-option>
                  <el-option label="Fold" value="Fold"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Third_keyword">
                <el-select
                  v-model="formData.Third_keyword"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="Null" value="Null"></el-option>
                  <el-option label="Source" value="Trace"></el-option>
                  <el-option label="CMP line" value="CMP line"></el-option>
                  <el-option label="CMP" value="CMP"></el-option>
                  <el-option label="Offest" value="Offset"></el-option>
                  <el-option label="Receiver line" value="Receiver line"></el-option>
                  <el-option
                    label="Receiver station"
                    value="Receiver station"
                  ></el-option>
                  <el-option label="Source line" value="Source line"></el-option>
                  <el-option label="Source station" value="Source station"></el-option>
                  <el-option label="Source X" value="Source X"></el-option>
                  <el-option label="Source Y" value="Source Y"></el-option>
                  <el-option label="Rreceiver X" value="Rreceiver X"></el-option>
                  <el-option label="Rreceiver Y" value="Rreceiver Y"></el-option>
                  <el-option label="CMP X" value="CMP X"></el-option>
                  <el-option label="CMP Y" value="CMP Y"></el-option>
                  <el-option label="OVT" value="OVT"></el-option>
                  <el-option label="Fold" value="Fold"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Maximum_number_of_traces">
                <el-input v-model="formData.Maximum_number_of_traces"></el-input>
              </el-form-item>
              <el-form-item
                label="Specify_temp_file_path_option"
                prop="Specify_temp_file_path_option"
              >
                <el-select
                  v-model="formData.Specify_temp_file_path_option"
                  placeholder="请选择类型"
                  style="width: 100%"
                >
                  <el-option label="no" value="no"></el-option>
                  <el-option label="yes" value="yes"></el-option>
                </el-select>
              </el-form-item>
            </template>
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
  name: "ChannelMerge",
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
        Resort: "no",
        Number_of_Channels: 5,
        First_keyword: "CMP",
        Second_keyword: "Null",
        Third_keyword: "Null",
        Maximum_number_of_traces: 10000,
        Specify_temp_file_path_option: "no",
        Description:
          "The module ChannelMerge, a multiple channel module, can accept at least 2 and at most 10 traces at a time through different channels. According to the user-defined keywords, these inputted traces in different channels are sorted and merged, and then outputted through channel 0 in order to generate a merged dataset as required by the user.",
      },
      rules: {
        Stacking_methods: [
          { required: true, message: "请选择输出文件类型", trigger: "change" },
        ],
      },
      activeNames: ["1"], // 默认展开第一类
    };
  },
  computed: {
    isYes() {
      return this.formData.Resort === "yes";
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

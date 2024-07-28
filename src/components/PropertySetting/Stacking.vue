<template>
  <div>
    <el-form ref="formRef" label-width="160px" :model="formData" label-position="left">
      <div class="form-container">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="General Parameters" name="1">
            <el-form-item label="Stacking_methods" prop="Stacking_methods" required>
              <el-select
                v-model="formData.Stacking_methods"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="normal" value="normal"></el-option>
                <el-option
                  label="without noise factor"
                  value="without noise factor"
                ></el-option>
                <el-option
                  label="with noise factor"
                  value="with noise factor"
                ></el-option>
                <el-option
                  label="amplitude preserved"
                  value="amplitude preserved"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Input_data_gather_type">
              <el-select
                v-model="formData.Input_data_gather_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="CMP" value="CMP"></el-option>
                <el-option label="CCP" value="CCP"></el-option>
                <el-option label="Source" value="Source"></el-option>
                <el-option label="Receiver" value="Receiver"></el-option>
                <el-option label="other" value="other"></el-option>
              </el-select>
            </el-form-item>

            <template v-if="isNormal">
              <el-form-item label="Apply_weighting_coefficient">
                <el-select
                  v-model="formData.Apply_weighting_coefficient"
                  placeholder="请选择类型"
                  style="width: 100%"
                >
                  <el-option label="No" value="No"></el-option>
                  <el-option label="Yes" value="Yes"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Weighting_coefficient">
                <el-input v-model="formData.Weighting_coefficient"></el-input>
              </el-form-item>
            </template>

            <template v-if="isWithNoiseFactor">
              <el-form-item label="Offset_weight">
                <el-input v-model="formData.Offset_weight"></el-input>
              </el-form-item>
              <el-form-item label="Noise_factor">
                <el-input v-model="formData.Noise_factor"></el-input>
              </el-form-item>
            </template>

            <template v-if="isWithoutNoiseFactor">
              <el-form-item label="Offset_weight">
                <el-input v-model="formData.Offset_weight"></el-input>
              </el-form-item>
            </template>

            <template v-if="isAmplitudePreserved">
              <el-form-item label="Equalization_window_length(ms)">
                <el-input v-model="formData.Equalization_window_length"></el-input>
              </el-form-item>

              <el-form-item label="Apply_weighting_coefficient">
                <el-select
                  v-model="formData.Apply_weighting_coefficient"
                  placeholder="请选择类型"
                  style="width: 100%"
                >
                  <el-option label="No" value="No"></el-option>
                  <el-option label="Yes" value="Yes"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" Weighting_coefficient">
                <el-input v-model="formData.Weighting_coefficient"></el-input>
              </el-form-item>
              <el-form-item label="Output_options">
                <el-select
                  v-model="formData.Output_options"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="Output_option" value="Output_option"></el-option>
                  <el-option
                    label="equalization traces"
                    value="equalization traces"
                  ></el-option>
                  <el-option
                    label="amplitude preserved traces"
                    value="amplitude preserved traces"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>

            <el-form-item label="Maximum_flod">
              <el-input v-model="formData.Maximum_flod"></el-input>
            </el-form-item>

            <el-form-item label="Apply_only_valid_trace">
              <el-select
                v-model="formData.Apply_only_valid_trace"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="Yes" value="Yes)"></el-option>
                <el-option label="No" value="No"></el-option>
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
        Stacking_methods: "normal",
        Input_data_gather_type: "CMP",
        Equalization_window_length: "500",
        Apply_weighting_coefficient: "yes",
        Weighting_coefficient: 100,
        Offset_weight: 0.0,
        Output_options: "amplitude preserved traces",
        Noise_factor: 0.0,
        Maximum_flod: 1000,
        Apply_only_valid_trace: "Yes",
        Description:
          "Stacking is the module which stacks the traces after the normal-moveout to enhance the sigal and to suppress the noise.",
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
    isNormal() {
      return this.formData.Stacking_methods === "normal";
    },
    isWithoutNoiseFactor() {
      return this.formData.Stacking_methods === "without noise factor";
    },
    isWithNoiseFactor() {
      return this.formData.Stacking_methods === "with noise factor";
    },
    isAmplitudePreserved() {
      return this.formData.Stacking_methods === "amplitude preserved";
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

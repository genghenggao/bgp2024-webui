<template>
  <div>
    <el-form ref="formRef" label-width="160px" :model="formData" label-position="left">
      <div class="form-container">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="General Parameters" name="1">
            <el-form-item label="Output_file_name" prop="Output_file_name" required>
              <el-input v-model="formData.Output_file_name"></el-input>
            </el-form-item>
            <el-form-item label="Output_file_version_number">
              <el-input v-model="formData.Output_file_version_number"></el-input>
            </el-form-item>
            <el-form-item label="Repeated_filename">
              <el-select
                v-model="formData.Repeated_filename"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="job abort" value="job abort"></el-option>
                <el-option label="override file" value="override file"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Muting_filename">
              <el-input v-model="formData.Muting_filename"></el-input>
            </el-form-item>

            <template v-if="isPPhyperbolic">
              <el-form-item label="NMO_stetch_mute_factor">
                <el-input v-model="formData.NMO_stetch_mute_factor"></el-input>
              </el-form-item>
            </template>

            <el-form-item label="Moveout_methods">
              <el-select
                v-model="formData.Moveout_methods"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="PP hyperbolic" value="PP hyperbolic"></el-option>
                <el-option
                  label="PP update hyperbolic"
                  value="PP update hyperbolic"
                ></el-option>
                <el-option
                  label="PP update parabolic"
                  value="PP update parabolic"
                ></el-option>
                <el-option label="PS simplifield" value="PS simplifield"></el-option>
                <el-option label="PS ISO stacking" value="PS ISO stacking"></el-option>
                <el-option label="PS ISO upadtee" value="PS ISO update"></el-option>
                <el-option label="PS VIT update" value="PS VIT update"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Spectrum" name="2">
            <el-form-item label="Velocity_scan_type">
              <el-select
                v-model="formData.Velocity_scan_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option
                  label="constant velocity"
                  value="constant velocity"
                ></el-option>
                <el-option
                  label="reference velocity"
                  value="reference velocity"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Reference_velocity_filename">
              <el-input v-model="formData.Reference_velocity_filename"></el-input>
            </el-form-item>
            <el-form-item label="TV_pair_file_name">
              <el-input v-model="formData.TV_pair_file_name"></el-input>
            </el-form-item>
            <template v-if="isConstantvelocity">
              <el-form-item label="Velocity_scan_range">
                <el-input v-model="formData.Velocity_scan_range"></el-input>
              </el-form-item>
            </template>
            <template v-if="isReferencevelocity">
              <el-form-item label="High_and_low_limit_scale">
                <el-input v-model="formData.High_and_low_limit_scale"></el-input>
              </el-form-item>
            </template>
            <el-form-item label="Velocity_interval_of_power_matrix">
              <el-input v-model="formData.Velocity_interval_of_power_matrix"></el-input>
            </el-form-item>
            <el-form-item label="Temporal_interval_of_power_matrix">
              <el-input v-model="formData.Temporal_interval_of_power_matrix"></el-input>
            </el-form-item>
            <el-form-item label="Semblance_type">
              <el-select
                v-model="formData.Semblance_type"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="blank" value="blank"></el-option>
                <el-option
                  label="unnormalized crossccorrelation"
                  value="unnormalized crossccorrelation"
                ></el-option>
                <el-option
                  label="normalized crossccorrelation"
                  value="normalized crossccorrelation"
                ></el-option>
                <el-option label="semblance" value="semblance"></el-option>
                <el-option
                  label="complex semblance"
                  value="complex semblance"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Power_of_semblance">
              <el-input v-model="formData.Power_of_semblance"></el-input>
            </el-form-item>
            <el-form-item label="Minimum_valid_traces">
              <el-input v-model="formData.Minimum_valid_traces"></el-input>
            </el-form-item>
            <el-form-item label="Temporal_smoothing_length">
              <el-input v-model="formData.Temporal_smoothing_length"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Supergather " name="3">
            <el-form-item label="Sort_supergather_by">
              <el-select
                v-model="formData.Sort_supergather_by"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option
                  label="offset(single side)"
                  value="offset(single side)"
                ></el-option>
                <el-option
                  label="offset(double side)"
                  value="offset(double side)"
                ></el-option>
                <el-option label="OVT" value="OVT"></el-option>
              </el-select>
            </el-form-item>

            <template v-if="isOffset">
              <el-form-item label="Combine_supergather">
                <el-select
                  v-model="formData.Combine_supergather"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="no" value="no"></el-option>
                  <el-option label="yes" value="yes"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Multi_thread_appliction">
                <el-select
                  v-model="formData.Multi_thread_appliction"
                  placeholder="请选择类型"
                  style="width: 100%"
                  filterable
                  allow-create
                >
                  <el-option label="auto" value="auto"></el-option>
                  <el-option label="user defined" value="user defined"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="Number_of_threads">
              <el-input v-model="formData.Number_of_threads"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Stack segment" name="4">
            <el-form-item label="Velocity_range_for_stack_segments">
              <el-input v-model="formData.Velocity_range_for_stack_segments"></el-input>
            </el-form-item>

            <el-form-item label="Number_of_stack_segments">
              <el-input v-model="formData.Number_of_stack_segments"></el-input>
            </el-form-item>
            <el-form-item label="Apply_weighting_coefficient">
              <el-select
                v-model="formData.Apply_weighting_coefficient"
                placeholder="请选择类型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option label="no" value="no"></el-option>
                <el-option label="yes" value="yes"></el-option>
              </el-select>
            </el-form-item>
            <template v-if="isApplyweight">
              <el-form-item label="Weight_coefficient">
                <el-input v-model="formData.Weight_coefficient"></el-input>
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
  name: "VelAnaCorr",
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
        Output_file_name: "",
        Output_file_version_number: "1.00",
        Repeated_filename: "job abort",
        Muting_filename: "",
        NMO_stetch_mute_factor: 190.0,
        Moveout_methods: "PP hyperbolic",
        Velocity_scan_type: "reference velocity",
        Velocity_scan_range: "",
        Reference_velocity_filename: "",
        // TV_update: "",
        TV_pair_file_name: "",
        High_and_low_limit_scale: "",
        Velocity_interval_of_power_matrix: 20,
        Temporal_interval_of_power_matrix: 20,
        Semblance_type: "blank",
        Power_of_semblance: 1.0,
        Minimum_valid_traces: 5,
        Temporal_smoothing_length: 32,
        Sort_supergather_by: "offset(double side)",
        Combine_supergather: "no",
        Multi_thread_appliction: "user defined",
        Number_of_threads: 4,
        Velocity_range_for_stack_segments: "",
        Number_of_stack_segments: 11,
        Apply_weighting_coefficient: "no",
        Weight_coefficient: 0,
        Description:
          "Using the NMO velocity defined by the user, VelAnaCorr runs mute and NMO processing on the gathers for velocity analysis, and then cross correlations. The result is output to power matrix to form velocity spectrum. ",
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
    isPPhyperbolic() {
      return (
        this.formData.Moveout_methods === "PP hyperbolic" ||
        this.formData.Moveout_methods === "PS ISO stacking" ||
        this.formData.Moveout_methods === "PS simplifield"
      );
    },
    isConstantvelocity() {
      return this.formData.Velocity_scan_type === "constant velocity";
    },
    isOffset() {
      return (
        this.formData.Sort_supergather_by === "offset(single side)" ||
        this.formData.Sort_supergather_by === "offset(double side)"
      );
    },
    isApplyweight() {
      return this.formData.Apply_weighting_coefficient === "yes";
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

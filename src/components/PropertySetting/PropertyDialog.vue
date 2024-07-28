<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-20 11:05:26
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-27 18:45:06
-->
<template>
  <div class="property-dialog">
    <User
      v-if="nodeData.type === 'user'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <CommonProperty
      v-else-if="nodeData.type === 'rect'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <GeoDiskIn
      v-else-if="nodeData.type === 'geodiskin'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <Stacking
      v-else-if="nodeData.type === 'stacking'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <CumtbWeb
      v-else-if="nodeData.type === 'cumtbweb'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <ChannelMerge
      v-else-if="nodeData.type === 'channelmerge'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <VelAnaCorr
      v-else-if="nodeData.type === 'velanacorr'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <GeoDiskOut
      v-else-if="nodeData.type === 'geodiskout'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
  </div>
</template>
<script>
import CommonProperty from "./CommonProperty";
import GeoDiskIn from "./GeoDiskIn.vue";
import GeoDiskOut from "./GeoDiskOut.vue";
import Stacking from "./Stacking.vue";
import VelAnaCorr from "./VelAnaCorr.vue";
import CumtbWeb from "./CumtbWeb.vue";
import ChannelMerge from "./ChannelMerge.vue";

export default {
  name: "PropertyDialog",
  components: {
    CommonProperty,
    GeoDiskIn,
    GeoDiskOut,
    Stacking,
    VelAnaCorr,
    CumtbWeb,
    ChannelMerge,
  },
  props: {
    nodeData: Object,
    lf: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("setPropertiesFinish");
    },
  },
};
</script>
<style>
.property-dialog {
  padding: 10px;
}
</style>

<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-20 11:05:26
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-24 10:31:42
-->
<template>
  <div class="node-panel">
    <div class="node-item"
      v-for="item in nodeList"
      :key="item.text"
      @mousedown="$_dragNode(item)">
    <div class="node-item-icon" :class="item.class">
      <div v-if="item.type === 'user' || item.type === 'time'" class="shape"></div>
    </div>
    <!-- <span class="node-label">{{item.text}}</span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodePanel',
  props: {
    lf: Object,
    nodeList: Array,
  },
  methods: {
    $_dragNode (item) {
      this.$props.lf.dnd.startDrag({
        type: item.type,
      })
    }
  }
}
</script>
<style>
.node-panel {
  position: absolute;
  top: 80px;
  left: 10px;
  width: 135px;
  padding: 20px 1px;
  background-color: white;
  box-shadow: 0 0 5px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 20px;
}
.node-item-icon {
  width: 125px;
  height: 40px;
  margin-left: 5px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.node-start{
  background: url('../background/start.png') no-repeat;
  background-size: cover;
}
.node-geodiskin{
  background: url('../background/geodiskin.svg') no-repeat;
  background-size: cover;
}
.node-geodiskout{
  background: url('../background/geodiskout.svg') no-repeat;
  background-size: cover;
}
.node-cumtbweb{
  background: url('../background/cumtbweb.svg') no-repeat;
  background-size: cover;
}
.node-channelmerge{
  background: url('../background/channelmerge.svg') no-repeat;
  background-size: cover;
}
.node-takegatherattri{
  background: url('../background/takegatherattri.svg') no-repeat;
  background-size: cover;
}
.node-stacking{
  background: url('../background/stacking.svg') no-repeat;
  background-size: cover;
}
.node-rect{
  border: 1px solid black;
}
.node-user{
  background: url('../background/user.png') no-repeat;
  background-size: cover;
}
.node-time{
  background: url('../background/time.png') no-repeat;
  background-size: cover;
}
.node-push{
  background: url('../background/push.png') no-repeat;
  background-size: cover;
}
.node-download{
  background: url('../background/download.png') no-repeat;
  background-size: cover;
}
.node-click{
  background: url('../background/click.png') no-repeat;
  background-size: cover;
}
.node-end{
  background: url('../background/end.png') no-repeat;
  background-size: cover;
}
</style>

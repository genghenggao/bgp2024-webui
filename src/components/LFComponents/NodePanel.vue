<template>
  <div class="node-panel">
    <div class="node-item" v-for="item in nodeList" :key="item.text" @mousedown="$_dragNode(item)">
      <el-tag class="node-tag">{{ item.text }}</el-tag>
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
    $_dragNode(item) {
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
  max-height: 400px; /* 设置最大高度 */
  padding: 20px 1px;
  background-color: white;
  box-shadow: 0 0 5px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
  overflow-y: auto; /* 启用垂直滚动 */
  scrollbar-width: none; /* 适用于 Firefox */
  -ms-overflow-style: none; /* 适用于 Internet Explorer 和 Edge */
}
.node-panel::-webkit-scrollbar {
  display: none; /* 适用于 Chrome、Safari 和 Opera */
}
.node-item {
  margin-bottom: 10px;
  user-select: none; /* 避免选中文字 */
}
.node-tag {
  display: inline-block;
  width: 120px; /* 设置固定宽度 */
  text-align: center; /* 确保文本居中 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer; /* 鼠标悬停时变成小手 */
  user-select: none; /* 避免选中文字 */
}
</style>

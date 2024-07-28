<template>
  <div class="connect">
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    done(type) {
      this.$emit('select-button', type)
    }
  }
}
</script>

<style scoped>
.connect {
  width: 100%;
  height: 100%;
  background: #FFF;
  border: 1px solid #9a9a9b;
  box-sizing: border-box;
  padding: 10px;
}
.connect p {
  margin: 0;
}
.button-list {
  position: absolute;
  bottom: 10px;
}
</style>
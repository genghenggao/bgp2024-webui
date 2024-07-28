<template>
  <a :href="link" class="info-card">
    <div class="info-card-image-wrapper">
      <img :src="require(`@/assets/${imgSrc}`)" class="info-card-image" />
      <div class="info-card-content">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.info-card {
  display: block;
  background: transparent;
  border-radius: 8px;
  text-align: center;
  padding: 0;
  transition: transform 0.3s, color 0.3s, background 0.3s, width 0.3s;
  text-decoration: none;
  color: inherit;
  width: 80%;
  margin: 0 auto;
  outline: none; /* 添加这一行 */
  user-select: none; /* 禁止选取 */
}
.info-card:hover {
  transform: translateY(-10px);
  color: #007bff;
  outline: none; /* 添加这一行 */
}
.info-card:hover .info-card-content h3,
.info-card:hover .info-card-content p {
  color: #007bff;
}
.info-card-image-wrapper {
  position: relative;
}
.info-card-image {
  width: 100%;
  display: block;
  border-radius: 8px;
  user-select: none; /* 禁止选取 */
}
.info-card-content {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  text-align: center;
  user-select: none; /* 禁止选取 */
}
.info-card-content h3 {
  margin: 0;
  font-size: 18px;
  color: #fff;
  transition: color 0.3s;
}
.info-card-content p {
  margin: 0;
  font-size: 14px;
  color: #fff;
  transition: color 0.3s;
}
</style>

<script setup lang="ts">
const form = reactive({
  lat: 0,
  lon: 0,
  weather: '',
});

onMounted(async () => {
  const positionRes = await fetch('http://ip-api.com/json');
  const positionData = await positionRes.json();
  form.lat = positionData.lat;
  form.lon = positionData.lon;
  const weatherRes = await fetch(`/api/weather?lat=${form.lat}&lon=${form.lon}`);
  const weatherData = await weatherRes.json();
  form.weather = weatherData.weather[0].main;
  console.log(weatherData);
});
</script>

<template>
  <el-form class="form">
    <el-form-item>
      <h1>智能山药水肥管理建议系统</h1>
    </el-form-item>
    <el-form-item label="经度">
      <el-input-number v-model="form.lon" :min="0" :max="180" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="纬度">
      <el-input-number v-model="form.lat" :min="0" :max="90" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item>
      <iframe :src="`https://uri.amap.com/marker?position=${form.lon},${form.lat}`"></iframe>
    </el-form-item>
    <el-form-item label="天气情况">
      <div>{{ form.weather }}</div>
    </el-form-item>
  </el-form>
</template>

<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}

.form {
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  max-width: 1000px;
  margin: auto;
  background-color: white;
  box-shadow: 0 2px 10px #bdbdbd;
}

.form h1 {
  margin: 0;
}

.form iframe {
  border: none;
  width: 100%;
  height: 500px;
}
</style>
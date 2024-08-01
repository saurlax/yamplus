<script setup lang="ts">
import axios from 'axios';
import { marked } from 'marked';

const form = reactive({
  lat: 0,
  lon: 0,
  weather: '',
  advice: '',
});

onMounted(async () => {
  const positionResp = await axios.get('http://ip-api.com/json');
  form.lat = positionResp.data.lat;
  form.lon = positionResp.data.lon;

  const weatherResp = await axios.get(`/api/weather?lat=${form.lat}&lon=${form.lon}`);
  form.weather = `${weatherResp.data.weather[0].main} (${JSON.stringify(weatherResp.data.main)})`;
  console.log(weatherResp.data);

  const adviceResp = await axios.post('/api/advice', weatherResp.data.main);
  form.advice = adviceResp.data;
  console.log(adviceResp.data);

});
</script>

<template>
  <el-form class="form">
    <h1>智能山药水肥管理建议系统</h1>
    <el-form-item label="经度">
      <el-input-number v-model="form.lon" :min="0" :max="180" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="纬度">
      <el-input-number v-model="form.lat" :min="0" :max="90" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item>
      <iframe :src="`https://uri.amap.com/marker?position=${form.lon},${form.lat}`"></iframe>
    </el-form-item>
    <el-form-item label="气象信息">
      <div>{{ form.weather }}</div>
    </el-form-item>
    <h2>水肥管理建议</h2>
    <div class="advice">
      <div v-if="form.advice" v-html="marked.parse(form.advice)"></div>
      <el-skeleton v-else animated />
    </div>
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

.form iframe {
  border: none;
  width: 100%;
  height: 500px;
}

.advice {
  text-align: left;
}
</style>
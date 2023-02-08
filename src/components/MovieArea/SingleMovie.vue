<template><header>
      <h1>{{ movie?.name }}</h1>
    </header>
  <div v-if="movie" class="SingleMovie">
    <div class="Media">
      <img :src="movie.img" />
      <iframe :src="movie.trailer"></iframe>
      <div class="Details">
        <p>Description: {{ movie.description }}</p>
        <p>Category: {{ Capitalize(movie.genre) }}</p>
        <p>Duration: {{ movie.duration }} minutes</p>
      </div>
    </div>
    <MovieScreenings :id="movie.id" />
  </div>
</template>

<script setup lang="ts">
import type { MovieModelDto } from "../../Models/MovieModel";
import webApi from "@/Services/WebApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MovieScreenings from "./MovieScreenings.vue";
import { Capitalize } from "../../Helper";
const route = useRoute();
const movie = ref<MovieModelDto>();

onMounted(() => {
  webApi.singleMovie(route.params.id.toString()).then((res) => {
    movie.value = res.data;
  });
});
</script>

<style scoped>
@import "../../assets/Header.css";
h1 {
  letter-spacing: 0.8vw;
  font-family: "system-ui";
  text-transform: uppercase;
  text-align: center;
}
.Media {
  background-color: rgba(255, 255, 255, 0.41);
  box-shadow: 0 0 5px rgb(161, 161, 161);
  border-radius: 8px;
  padding: 10px;
}
.Details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.SingleMovie {
  margin: 0;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  background-size: cover;
  display: flex;
  flex-direction: column;
}
img {
  border-radius: 10px;
}
.SingleMovie * {
  margin: 10px;
}
.SingleMovie img {
  margin: 10px;
  height: 315px;
}
iframe {
  height: 315px;
  width: 560px;
  border: none;
  border-radius: 8px;
}
</style>

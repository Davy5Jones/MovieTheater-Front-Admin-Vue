<template>
     <div v-if="movie" class="SingleMovie">
        <h2>Name: {{movie.name}}</h2>
        <div>
            <img :src=movie.img />
        <div>
        <p>Description: {{movie.description}}</p>
        <p>Category: {{movie.category}}</p>
        <p>Duration: {{movie.duration}}</p>
        </div>
      </div>
      <MovieScreenings :id="movie.id"/>
      </div>
</template>

<script setup lang="ts">
import type { MovieModelDto } from '../../Models/MovieModel';
import webApi from '@/Services/WebApi';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MovieScreenings from './MovieScreenings.vue';
    const route = useRoute()
    const movie = ref<MovieModelDto>()
    
    onMounted(() => {
        webApi.singleMovie(route.params.id.toString()).then(res =>{
            movie.value=res.data;
        })
        
    })
</script>

<style scoped>
.SingleMovie {
    
    margin: 5px;
    align-items: center;
    justify-content: center;
    overflow: visible;

}

.SingleMovie * {
    margin :10px;
}
.SingleMovie img{
    margin: 10px;
    height: 315px;
}
iframe{
    height: 315px;
    width: 560px;
    border: none;
}




</style>
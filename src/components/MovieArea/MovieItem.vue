<template>
    <div class="MovieItem">
<h2 @click="()=>router.push({path:'movies'+'/'+movie.id})">{{props.movie.name}}</h2>
<p>
    description: {{ props.movie.description }}
</p>
<p>duration: {{props.movie.duration}}</p>
<p>active: {{ props.movie.active?"Yes":"No" }}</p>
    </div>
</template>

<script setup lang="ts">
import type { MovieModelDto } from '@/Models/MovieModel';
import { useRouter } from 'vue-router';
const router = useRouter()

const props =defineProps<{movie:MovieModelDto}>()


</script>

<style scoped>
.MovieItem {
    border: 4px;
    border-color: greenyellow;
    margin: 5px;
    grid-row: 4 span;
    grid-column:  3 span;
    max-width: 4 span;
    max-height:4 span;
    border-style: dashed;	
}

.MovieItem * {
    margin: 5px;
}

.MovieItem>img {
    object-fit: contain;
}
</style>
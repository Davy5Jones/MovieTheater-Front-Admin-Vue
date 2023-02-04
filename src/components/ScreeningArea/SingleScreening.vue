<template>
  <div v-if="screening" class="SingleScreening">
    <h3 @click="()=>router.push({path:'/movies'+'/'+screening?.movieId})">Movie: {{ screening.movieName }}</h3>
    <p>
      Screen time:
      {{ moment(screening.screenTime).format("MMMM Do YYYY, h:mm:ss a") }}
    </p>
    <div class="Seats">
      <div v-for="row in screening.seats" class="Row">
        <div
          v-for="seat in row"
          :class="seat ? 'RedChair' : 'GreenChair'"
        ></div>
        
      </div>
    </div>

    <div class="Screen"></div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

import type { ScreeningModelDto } from '@/Models/ScreeningModel';
import { onMounted, ref } from 'vue';
import webApi from '@/Services/WebApi';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const screening= ref<ScreeningModelDto>()
const router=useRouter()
const route = useRoute()
onMounted(() => {
    webApi.singleScreening(route.params.id.toString()).then((res) =>{
        screening.value=res.data;
    } )
})
</script>

<style scoped>
.SingleScreening {
  display: flex;
  flex-direction: column;
  border: 4px;
  border-color: greenyellow;
  margin: 5px;
  grid-row: 10 span;
  grid-column: 10 span;
  max-width: 10 span;
  max-height: 10 span;
  border-style: dashed;
  align-items: center;
  height: 90%;
}
.Row {
  height: 30px;
  display: flex;
  width: min-content;
}
.RedChair {
  margin: 3px;
  height: 80%;
  background-color: red;
  width: 20px;
  border-radius: 5px 5px 0 0;
}

.GreenChair {
  border-radius: 5px 5px 0 0;

  margin: 3px;
  height: 80%;
  background-color: green;
  width: 20px;
}
.GreenChair:hover {
  opacity: 0.5;
  box-shadow: 5px;
}

.Seats {
  display: inline-block;
  width: min-content;
  justify-content: center;
  align-items: center;
  margin:18px
}
.Screen {
  background-color: gray;
  width: 25%;
  height: 2px;
  margin: 10px;
}
</style>

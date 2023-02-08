<template>
  <div class="Wrapper">
<header>
      <h1>Screening</h1>
    </header>
  <div v-if="screening" class="SingleScreening">
    
    <h3 ><span @click="
                (event) => router.push({ path: '/movies' + '/' + screening?.movieId})
              " class="Linked">Movie: {{ screening.movieName }}</span></h3>
    <p>
      Screen time:
      {{ moment(screening.screenTime).format("DD/MM/YY HH:mm") }}
    </p>
    <div class="Seats">
      <h3>Tickets Bought/Left: {{ countTruthiness(screening.seats) }}</h3>
      <div v-for="row,ind in screening.seats" class="Row">
        {{ screening.seats.length- ind }}<div
          v-for="seat in row"
          :class="seat ? 'RedChair' : 'GreenChair'"
        ></div>
        
      </div>
    </div>

    <div class="Screen"></div>
  </div></div>
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


function countTruthiness(arr: boolean[][]): string {
    let trueCount = 0;
    let falseCount = 0;
    for (let row of arr) {
        for (let value of row) {
            if (value) {
                trueCount++;
            } else {
                falseCount++;
            }
        }
    }
    return trueCount+'/'+ falseCount;
}
</script>

<style scoped>
@import "../../assets/Header.css";
@import "../../assets/list.css";

.Wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.SingleScreening {
  display: flex;
  flex-direction: column;
  margin: 10px;
 background-color: rgba(255, 255, 255, 0.508);
  box-shadow: 0 0 5px rgb(161, 161, 161);
  border-radius: 8px;
  padding: 20px 40px;
  align-items: center;
  height: 100%;
  width: min-content;
}
.Row {
  height: 30px;
  display: flex;
  width: min-content;
}
.RedChair {
  margin: 3px;
  height: 80%;
  background-color: #df2024;
  width: 20px;
  border-radius: 5px 5px 0 0;
}

.GreenChair {
  border-radius: 5px 5px 0 0;

  margin: 3px;
  height: 80%;
  background-color:  #8EC28F
;
  width: 20px;
}
.GreenChair:hover {
  opacity: 0.5;
  box-shadow: 5px;
}
h1 { color: #7c795d; font-family: 'Trocchi', serif; font-size: 45px; font-weight: normal; line-height: 48px; margin: 0; }


h2 { color: #7c795d; font-family: 'Source Sans Pro', sans-serif; font-size: 28px; font-weight: 400; line-height: 32px; margin: 0 0 24px; }


.subheader { font-size: 26px; font-weight: 300; color: #ffcc66; margin: 0 0 24px; }


p { color: #4c4a37; font-family: 'Source Sans Pro', sans-serif; font-size: 18px; line-height: 32px; margin: 0 0 24px; }


a { color: #ff9900; background: #fff4a3; text-decoration: none; }


a:hover { color: #ffcc66 }
.Seats {
  display: inline-block;
  width: min-content;
  justify-content: center;
  align-items: center;
  margin: 10px;
display: flex;
  flex-direction: column;
  align-items: center;

}
.Screen {
  
  justify-content: center;
  background-color: gray;
  width: 80%;
  height: 4px;
  margin: 4px;
}
</style>

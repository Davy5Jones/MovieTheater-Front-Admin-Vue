<template>
    <div v-if="screenings.length>0" class="MovieScreeningsWrapper">
            <h1>Active screenings</h1>

        <table class="MovieScreenings">
      <tbody>
      <tr><th>Screening</th><th>Theater</th><th>3D</th><th>Tickets Bought/Left</th> </tr> 

      <template v-for="screenin in screenings">
         <tr >
<td >
    <span class="Linked" @click="(event)=>router.push({path:'/screenings'+'/'+screenin.id})">{{moment(screenin.screenTime).format("DD/MM/YYYY HH:mm")}}</span>
</td>
<td>{{screenin.theaterName}}</td>
<td>{{ screenin.threeD?"Yes":"No" }}</td>
<td>{{countTruthiness(screenin.seats) }}</td>
    </tr>
      </template>
    </tbody>
    </table>
        <Paginate v-if="info&&links" :info="info" :links="links"  @update-url="(add: string)=>watchUrl(add)"  />
      </div>

      <h2 v-else>No screenings at the moment...</h2>
</template>

<script setup lang="ts">
import type { Link, PageInfo, PageLinks } from '@/Models/BaseModels';
import type { ScreeningModelDto } from '@/Models/ScreeningModel';
import webApi from '@/Services/WebApi';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from '../Paginate.vue';
const props = defineProps<{id:string}>()
const router = useRouter()
const url = ref<Link>({href: ""});
const info = ref<PageInfo>();
const links = ref<PageLinks>();
const order = ref<string>();

const screenings =ref<ScreeningModelDto[]>([])
//router.push({path:"screenings",query:{page:info.value?.number+1}})

onMounted(()=>{
  webApi.screeningPageByMovieId(props.id,"",0,order.value||"").then((res) => {
    screenings.value = res.data._embedded.screeningModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;

  });
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

const watchUrl=(add:string)=>{
  url.value={href:add}
   webApi.screeningPageByMovieIdUrl(add).then((res) => {
    screenings.value = res.data._embedded.screeningModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
})
}
</script>

<style scoped>
@import "../../assets/list.css";

@import "../../assets/Header.css";

.MovieScreenings {
  height: 100%;

    
}
.MovieScreeningsWrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    align-items: center;
    max-height: fit-content;
    width: 100%;
}

h1 {
  letter-spacing: 0.8vw;
  font-family: "system-ui";
  text-transform: uppercase;
  text-align: center;
  color: white;
}

</style>
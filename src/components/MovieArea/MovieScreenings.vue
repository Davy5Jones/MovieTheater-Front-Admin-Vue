<template>
    <div v-if="screenings.length>0" class="MovieScreeningsWrapper">
            <h1>Active screenings</h1>

        <table class="MovieScreenings">
      <tbody>
      <tr><th>theater</th><th>time</th><th>3D</th><th>Active</th> </tr> 

      <template v-for="screenin in screenings">
         <tr >
<td @click="(event)=>router.push({path:'/screenings'+'/'+screenin.id})">{{screenin.theaterName}}</td>
<td>
    {{moment(screenin.screenTime).format("DD/M/YY hh:mm:ss")}}
</td>
<td>{{screenin.theaterName}}</td>
<td>{{ screenin.threeD?"Yes":"No" }}</td>
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
const screenings =ref<ScreeningModelDto[]>([])
//router.push({path:"screenings",query:{page:info.value?.number+1}})

onMounted(()=>{
  webApi.screeningPageByMovieId(props.id,"",0).then((res) => {
    screenings.value = res.data._embedded.screeningModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;

  });
})


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


.MovieScreenings {
  height: 92%;

    
}
.MovieScreeningsWrapper{
    	 height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    align-items: center;
}



</style>
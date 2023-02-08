<template>
    <div v-if="purchases.length>0" class="CustomerTicketsWrapper">
            <h1>Purchases</h1>

        <table class="CustomerTickets">
      <tbody>
      <tr><th>Movie</th><th>Screening</th><th>Theater</th><th>Row/Seat</th><th>Purchase Time</th> </tr> 

      <template v-for="purchase in purchases">
         <tr >
<td>{{purchase.movieName}}</td>
<td>
  <span @click="
                (event) => router.push({ path: '/screenings' + '/' + purchase.screeningId })
              " class="Linked">{{ moment(purchase.dateTime).format("DD/MM/YYYY HH:mm")}}</span>
    
</td>
<td>{{purchase.theaterName}}</td>
<td>{{  (purchase.rowId+1) +'/'+ (purchase.seatId+1) }}</td>
<td>
    {{ moment(purchase.purchaseTime).format("DD/MM/YYYY HH:mm")}}
</td>
    </tr>
      </template>
    </tbody>
    </table>
        <Paginate v-if="info&&links" :info="info" :links="links"  @update-url="(add: string)=>watchUrl(add)"  />
      </div>

      <h2 v-else>No purchases!</h2>
</template>

<script setup lang="ts">
import type { Link, PageInfo, PageLinks } from '@/Models/BaseModels';
import type { ScreeningModelDto } from '@/Models/ScreeningModel';
import type { TicketDto } from '@/Models/TicketModels';
import webApi from '@/Services/WebApi';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from '../Paginate.vue';
const props = defineProps<{id:number}>()
const router = useRouter()
const url = ref<Link>({href: ""});
const info = ref<PageInfo>();
const links = ref<PageLinks>();
const purchases =ref<TicketDto[]>([])
//router.push({path:"screenings",query:{page:info.value?.number+1}})

onMounted(()=>{
  webApi.GetTicketPageByCustomer(0,"","",props.id).then((res) => {
    purchases.value = res.data._embedded.ticketModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;

  });
})


const watchUrl=(add:string)=>{
  url.value={href:add}
   webApi.GetTicketsUrl(add).then((res) => {
    purchases.value = res.data._embedded.ticketModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
})
}
</script>

<style scoped>
@import "../../assets/list.css";

@import "../../assets/Header.css";

.CustomerTickets {
  height: 100%;

    
}
.CustomerTicketsWrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    align-items: center;
    max-height: fit-content;
    width: 100%;
    margin-bottom: 10px;
}

h1 {
  letter-spacing: 0.8vw;
  font-family: "system-ui";
  text-transform: uppercase;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.36);
  padding: 5px 12px;
  border-radius: 5px;
}

</style>
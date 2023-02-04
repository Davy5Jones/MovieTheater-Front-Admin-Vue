<template>
  <div class="PurchasesListWrapper">
    <table class="PurchasesList">
      <tbody>
        <tr>
          <th class="ThHover" @click="alterSorting('userEmail')">
            <span>Customer</span>
          </th>
          <th>Movie</th>
          <th >Screening Time</th>
          <th>Theater</th>
          <th>Row/Seat</th>
                    <th class="ThHover" @click="alterSorting('purchaseTime')"><span>Purchase time</span></th>

        </tr>

        <template v-for="ticket in tickets">
          <tr>
            <td
             
            >
              {{ ticket.userEmail }}
            </td>
            <td>
                
                {{ ticket.movieName }}
            </td>
            <td 
              >
              {{
                moment(ticket.dateTime).format("DD/M/YY HH:mm")
              }}
            </td>
            <td> {{ ticket.theaterName }}</td>
            <td>{{ (ticket.rowId+1) +'/'+ (ticket.seatId+1) }}</td>
            <td> {{moment(ticket.purchaseTime).format("DD/M/YY HH:mm")  }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <Paginate
      @update-url="(add:string) => watchUrl(add)"
      v-if="info && links"
      :info="info"
      :links="links"
    />
  </div>
</template>

<script setup lang="ts">
import { alterSort, getPageWatcher } from '@/Beans';
import type { Link, PageInfo, PageLinks } from '@/Models/BaseModels';
import type { TicketDto } from '@/Models/TicketModels';
import webApi from '@/Services/WebApi';
import moment from 'moment';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from '../Paginate.vue';


//todo link customer


const tickets = ref<TicketDto[]>([]);
const url = ref<Link>({
  href: "",
});
const page = ref<number>();
const sort = ref<string>();
const info = ref<PageInfo>();
const links = ref<PageLinks>();
const order = ref<string>();
const alterSorting= ref<Function>((str:string)=>{});
const router = useRouter();
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  page.value = +(params.get("page") || 1) - 1;
  sort.value = params.get("sort") || "";
  alterSorting.value= alterSort(sort,order);

    init();
  getPageWatcher(sort, page, order, init, router);
  sort.value? router.push({
          query: {
            page: (page.value || 0) + 1,
            sort: sort.value,
            order: order.value || "ASC",
          },
        }): router.push({ query: { page: (page.value || 0) + 1 } });
});
const watchUrl = (add: string) => {
  url.value = { href: add };
  webApi.GetTicketsUrl(url.value.href).then((res) => {
    tickets.value = res.data._embedded.ticketModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
    page.value = info.value.number;
  });
};

function init() {
  webApi
    .GetTicketPage((page.value || 0), sort.value || "",order.value||"")
    .then((res) => {
      tickets.value = res.data._embedded.ticketModelDtoList;
      info.value = res.data.page;
      links.value = res.data._links;
    });
}
</script>

<style scoped>
@import "../../assets/list.css";
.PurchasesListWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  display: flex;
    justify-content: space-between;
    align-items: center;
}

.PurchasesList {
  text-align: center;
  text-align: center;
}
</style>
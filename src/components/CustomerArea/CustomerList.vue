<template>
  <div class="CustomerListWrapper">
    <div>
    <header>
      <h1>Customers</h1>
    </header>
    <table class="CustomerList">
      <tbody>
        <tr>
          <th class="ThHover" @click="alterSorting('email')">
            <span>Email</span>
          </th>
          <th class="ThHover" @click="alterSorting('name')">
            <span>Name</span>
          </th>
          <th>Registration</th>
          <th>Last Seen</th>
        </tr>
        <template v-for="customer in customers">
          <tr>
            <td>
 <span @click="
                (event) => router.push({ path: '/customers' + '/' + customer.id })
              " class="Linked">{{ customer.emailAddress }}</span>            </td>
            <td>
              {{ customer.customerName }}
            </td>
            <td>{{ moment(customer.registered).format("DD.MM.YYYY") }}</td>
            <td>
              {{
               new Date(customer.lastSeen ) >new Date(Date.now() - 1000 * 60 * 5)
                  ? "Online"
                  : displayTime(((Date.now() )-
                     new Date(customer.lastSeen).getTime()-
                        1000 * 60 * 5
                       ) /1000
                    )
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table></div>
    <Paginate
      @update-url="(add) => watchUrl(add)"
      v-if="info && links"
      :info="info"
      :links="links"
    />
  </div>
</template>

<script setup lang="ts">
import type { Link, PageInfo, PageLinks } from "@/Models/BaseModels";
import webApi from "../../Services/WebApi";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Paginate from "../Paginate.vue";
import { alterSort, getPageWatcher } from "@/Beans";
import type { CustomerModelDto } from "@/Models/UserModels";
import moment from "moment";
import { Capitalize, displayTime } from "../../Helper";


const customers = ref<CustomerModelDto[]>([]);
const url = ref<Link>({
  href: "",
});

const info = ref<PageInfo>();
const links = ref<PageLinks>();

const router = useRouter();
const page = ref<number>();
const sort = ref<string>();
const order = ref<string>();

const alterSorting = ref<Function>((str: string) => {});
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  page.value = +(params.get("page") || 1) - 1;
  sort.value = params.get("sort") || "";
  order.value = params.get("order") || "";
  alterSorting.value = alterSort(sort, order);
  init();
  getPageWatcher(sort, page, order, init, router);
  sort.value
    ? router.push({
        query: {
          page: (page.value || 0) + 1,
          sort: sort.value,
          order: order.value || "ASC",
        },
      })
    : router.push({ query: { page: (page.value || 0) + 1 } });
});
const init = () => {
  webApi
    .GetUserPage(page.value || 0, sort.value || "", order.value || "")
    .then((res) => {
      customers.value = res.data._embedded.customerModelDtoList;
      info.value = res.data.page;
      links.value = res.data._links;
      console.log(new Date(res.data._embedded.customerModelDtoList[0].lastSeen).getTime() );
    });
};

const watchUrl = (add: string) => {
  url.value = { href: add };
  webApi.GetUserPageUrl(url.value.href).then((res) => {
    customers.value = res.data._embedded.customerModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
    page.value = info.value.number;
  });
};
</script>

<style scoped>
@import "../../assets/list.css";
@import "../../assets/Header.css";


.CustomerList {
  text-align: center;
}
.CustomerListWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 75vh;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}
</style>

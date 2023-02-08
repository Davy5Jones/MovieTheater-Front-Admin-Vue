<template>
  <div class="ScreeningListWrapper">
    <div>
      <header>
        <h1>Screenings</h1>
      </header>
      <table class="ScreeningList">
        <tbody>
          <tr>
            <th class="ThHover" @click="alterSorting('movieName')">
              <span>Movie</span>
            </th>
            <th class="ThHover" @click="alterSorting('screenTime')">
              <span>Screening</span>
            </th>
            <th>Theater</th>
            <th>3D</th>
          </tr>
          <template v-for="screenin in screenings">
            <tr>
              <td>
                <span
                  @click="
                    (event) =>
                      router.push({ path: '/movies' + '/' + screenin.movieId })
                  "
                  class="Linked"
                  >{{ screenin.movieName }}</span
                >
              </td>
              <td>
                <span
                  @click="
                    (event) =>
                      router.push({ path: '/screenings/'+ screenin.id })
                  "
                  class="Linked"
                  >{{ moment(screenin.screenTime).format("DD/M/YY HH:mm") }}</span>
              </td>
              <td>{{ screenin.theaterName }}</td>
              <td>{{ screenin.threeD ? "Yes" : "No" }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
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
import type { ScreeningModelDto } from "@/Models/ScreeningModel";
import webApi from "../../Services/WebApi";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Paginate from "../Paginate.vue";
import moment from "moment";
import { alterSort, getPageWatcher } from "@/Beans";

const screenings = ref<ScreeningModelDto[]>([]);
const url = ref<Link>({
  href: "",
});
const page = ref<number>();
const sort = ref<string>();
const info = ref<PageInfo>();
const links = ref<PageLinks>();
const router = useRouter();
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
const watchUrl = (add: string) => {
  url.value = { href: add };
  webApi.screeningPageUrl(url.value.href).then((res) => {
    screenings.value = res.data._embedded.screeningModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
    page.value = info.value.number;
  });
};

const init = () => {
  webApi
    .screeningPage(page.value || 0, sort.value || "", order.value || "")
    .then((res) => {
      screenings.value = res.data._embedded.screeningModelDtoList;
      info.value = res.data.page;
      links.value = res.data._links;
    });
};
</script>

<style scoped>
@import "../../assets/list.css";
@import "../../assets/Header.css";

.ScreeningListWrapper {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.ScreeningList {
  text-align: center;
}
</style>

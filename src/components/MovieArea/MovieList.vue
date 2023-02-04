<template>
  <div class="MovieListWrapper">
    <table class="MovieList">
      <tbody>
        <tr>
          <th class="ThHover" @click="alterSorting('name')">
            <span>Movie</span>
          </th>
          <th class="ThHover" @click="alterSorting('duration')">
            <span>Duration</span>
          </th>
          <th class="ThHover" @click="alterSorting('rating')">
            <span>Rating</span>
          </th>
          <th class="ThHover" @click="alterSorting('category')">
            <span>Category</span>
          </th>
          <th class="ThHover" @click="alterSorting('active')">
            <span>Active</span>
          </th>
        </tr>
        <template v-for="movie in movies">
          <tr>
            <td
              @click="
                (event) => router.push({ path: 'movies' + '/' + movie.id })
              "
            >
              {{ movie.name }}
            </td>
            <td>
              {{ movie.duration }}
            </td>
            <td>{{ movie.rating }}</td>
            <td>{{ movie.category }}</td>
            <td>{{ movie.active ? "Yes" : "No" }}</td>
          </tr>
        </template>
      </tbody>
    </table>
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
import type { MovieModelDto } from "@/Models/MovieModel";
import MovieItem from "./MovieItem.vue";
import { alterSort, getPageWatcher } from "@/Beans";

const movies = ref<MovieModelDto[]>([]);
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
    .moviePage(
      (page.value || "0").toString(),
      sort.value || "",
      order.value || ""
    )
    .then((res) => {
      movies.value = res.data._embedded.movieModelDtoList;
      info.value = res.data.page;
      links.value = res.data._links;
    });
};

const watchUrl = (add: string) => {
  url.value = { href: add };
  webApi.moviePageByUrl(url.value.href).then((res) => {
    movies.value = res.data._embedded.movieModelDtoList;
    info.value = res.data.page;
    links.value = res.data._links;
    page.value = info.value.number;
  });
};
</script>

<style scoped>
@import "../../assets/list.css";

.MovieList {
  text-align: center;
  text-align: center;
}

.MovieListWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}
</style>

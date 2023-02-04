import type { Ref } from "vue";
import  {  watch } from "vue";

import type { Router } from "vue-router";

export function getPageWatcher(
  sort: Ref<string | undefined>,
  page: Ref<number|undefined>,
  order: Ref<string | undefined>,
  init: Function,
  router: Router
) {
  watch(
    [sort, page, order],
    ([newSort, newPage, newOrder], [prevSort, prevPage, prevOrder]) => {
      if (sort.value) {
        if (newSort !== prevSort || newOrder !== prevOrder) {
          page.value = 0;
          init();
        }
        router.push({
          query: {
            page: (page.value || 0) + 1,
            sort: sort.value,
            order: order.value || "ASC",
          },
        });
        return;
      }

      router.push({ query: { page: (page.value || 0) + 1 } });
    }
  );
}

export function alterSort(sort: Ref<string|undefined>, order: Ref<string|undefined>):Function {
  const alterSort = (field: string) => {
    sort.value === field
      ? order.value === "ASC"
        ? (order.value = "DESC")
        : (order.value = "ASC")
      : (order.value = "ASC");
    sort.value = field;
  };

  return alterSort;
}
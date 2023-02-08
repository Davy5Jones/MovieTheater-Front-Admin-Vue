<template>
  <div v-if="customer" class="Wrapper" >
    <header>
      <h1>            {{ customer.emailAddress }}
</h1>
    </header>
  <div class="SingleCustomer">
    
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            {{ customer.customerName }}
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            {{ customer.emailAddress }}
          </td>
        </tr>
        <tr>
          <td>Last seen online:</td>
          <td>
            {{
              new Date(customer.lastSeen) > new Date(Date.now() - 1000 * 60 * 5)
                ? "Online"
                : displayTime(
                    (Date.now() -
                      new Date(customer.lastSeen).getTime() -
                      1000 * 60 * 5) /
                      1000
                  )
            }}
          </td>
        </tr>
        <tr>
          <td>Registration:</td>
          <td>
            {{ moment(customer.registered).format("DD.MM.YYYY") }}
          </td>
        </tr>
        <tr>
          <td >Purchases:</td>
          <td>{{ customer.purchases }}</td>
        </tr>
      
      </tbody>
    </table></div>
    <CustomerPurchases :id="customer.id" />
  </div>
</template>

<script setup lang="ts">
import type { CustomerModelDto } from "@/Models/UserModels";
import webApi from "@/Services/WebApi";
import moment from "moment";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { displayTime } from "../../Helper";
import CustomerPurchases from "./CustomerPurchases.vue";

const route = useRoute();
const customer = ref<CustomerModelDto>();

onMounted(() => {
  webApi.GetSingleUser(+route.params.id).then((res) => {
    customer.value = res.data;
    console.log(res.data);
  });
});
</script>

<style scoped>
@import "../../assets/Header.css";
@import "../../assets/list.css";
.Wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 75vh;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}

h1 {
  letter-spacing: 0.4vw ;
  font-family: "system-ui";
  text-transform: uppercase;
  text-align: center;
}
.Media {
  background-color: rgba(255, 255, 255, 0.41);
  box-shadow: 0 0 5px rgb(161, 161, 161);
  border-radius: 8px;
  padding: 10px;
}
.Details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.SingleCustomer {
  margin: 0;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  background-size: cover;
  display: flex;
  flex-direction: column;
  width: 70%;
}
img {
  border-radius: 10px;
}

.SingleCustomer img {
  margin: 10px;
  height: 315px;
}
iframe {
  height: 315px;
  width: 560px;
  border: none;
}
</style>

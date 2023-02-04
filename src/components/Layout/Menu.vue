<template>
  <div class="Menu">
    <router-link to="/home" class="link">Go to Home</router-link>
    <router-link v-if="!isLogged" to="/home/login" class="link"
      >Login</router-link
    >
    <router-link to="/screenings" v-if="isLogged" class="link"
      >screenings</router-link
    >
    <router-link to="/movies" v-if="isLogged" class="link"
      >movies</router-link
    >
    <router-link to="/purchases"  v-if="isLogged" class="link"
      >purchases</router-link
    >
  </div>
</template>

<script setup lang="ts">
import Store, { getter } from "@/Vuex/Store";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const isLogged =computed(()=>Store.getters[getter.GET_IS_LOGGED]) 
</script>

<style scoped lang="css">

.Menu {
    background-color: var(--primary-color);
    height: 8vh;
  grid-column: 12 span;
  background-color: var(--primary-color);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 20px;
  border-radius: 10px;
    background-image: linear-gradient(270deg,#898AA6 0,#C9BBCF 50%,#B7D3DF);
overflow: hidden;
box-shadow: 0 0 10px rgb(161, 161, 161);
}
.Menu > * {
}

.link {
    cursor:pointer;
  color: var(--font-color);
  text-decoration: none;
  margin: 0 15px;
  font-size: 20px;
  font-weight: 600;
  background-color: var(--bg-color);
  padding: 4px;
  padding-top: 0;
  display: inline-block;


  border-radius: 5px;
}
.router-link-active{
  font-size: 22px;
  background-color: #898aa6a8;
}

.link:hover {
  font-size: larger;
  background-color: #8d8d8d7a ;
}

.link:active {

}

</style>

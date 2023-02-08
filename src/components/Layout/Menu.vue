<template>
  <div class="Menu">
  <div class="links">
      
      <router-link  class="link" to="/home"><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"/><span>Home</span></router-link>
      <router-link to="/home/login"  v-if="!isLogged" class="link"
        ><img src="https://cdn-icons-png.flaticon.com/512/154/154345.png"/><span>Login</span></router-link
      >
      <router-link to="/screenings"  v-if="isLogged" class="link"
        ><img src="https://cdn-icons-png.flaticon.com/512/864/864508.png"/><span>Screenings</span></router-link
      >
      <router-link to="/movies" v-if="isLogged" class="link"
        ><img src="https://www.pngplay.com/wp-content/uploads/6/Film-Icon-PNG-Clipart-Background.png"/><span>Movies</span></router-link
      >
      <router-link to="/purchases" class="link" v-if="isLogged"  
        ><img src="https://www.pngkey.com/png/full/893-8933129_png-file-entry-ticket-icon.png"/><span>Purchases</span></router-link
      >
      <router-link v-if="isLogged"  class="link" to="/customers" 
        ><img src="https://icons.veryicon.com/png/o/miscellaneous/graph-library/person-liable-1.png"/><span>Customers</span></router-link
      >
  </div></div>
</template>

<script setup lang="ts">
import Store, { getter } from "@/Vuex/Store";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const isLogged = computed(() => Store.getters[getter.GET_IS_LOGGED]);
</script>

<style scoped lang="css">
.Menu {
 background: linear-gradient(9deg, rgba(187,187,191,1) 0%, rgba(189,191,191,1) 30%, rgb(122, 126, 127) 81%);
display: flex;
  justify-content: space-between;
  height: 12vh;
  grid-column: 12 span;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgb(161, 161, 161);
}
.Menu > * {
}
.links{
  display: flex;
  flex-direction: row;
  align-items: center;
height: 100%;
margin: 0 10px;
width: 60%;
}
.link {
  cursor: pointer;
  color: var(--font-color);
  text-decoration: none;
height: 80%;  
margin: 10px;
justify-content: center;
align-items: center;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;

  border-radius: 3px;
  width: 12%;
  opacity: 0.9;
  box-shadow: 0 0 5px rgb(161, 161, 161);

}

.link img{
  height: 35%;
  margin-top: 0px;
  margin-bottom: 3px;
  padding: 0;
}
.link span{
  margin-top: -5px;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  color: #525252;
}
.router-link-active {
  background-color: none;
    font-size: 22px;

}
.router-link-exact-active{
border-width: 2px;
border-style: solid;
border-color: black;
}


a{
  background: none;
}
.link:hover {

  opacity: 0.7;
box-shadow: 0 0 10px rgb(161, 161, 161);
}
</style>

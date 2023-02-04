<script setup lang="ts">
import Header from "./components/Layout/Header.vue"
import Footer from "./components/Layout/Footer.vue"
import Main from "./components/Layout/Main.vue"
import Menu from "./components/Layout/Menu.vue"

components:{
  Header;
  Footer;
  Main;
  Menu;
}
</script>

<template>
<div class="appContainer">
<Header></Header>
<Menu></Menu>
<Main></Main>
<Footer></Footer>
</div>

</template>

<style>
.appContainer {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(1fr, 1fr);

  background-color: #f1f6fb;
 background-image: linear-gradient(to right top, #cecece, #cfd0cf, #d1d1d1, #d2d3d2, #d4d4d4, #d2d2d3, #d1d0d1, #cfced0, #cbc8cb, #c7c2c5, #c4bdbf, #c0b7b8);
}

::-webkit-scrollbar {
    width: 14px;
}
::-webkit-scrollbar-thumb {
    background: #38384d;
    border-radius: 8px;
    height: 20%;
}::-webkit-scrollbar-track {
    background: #191923;
}
          

</style>

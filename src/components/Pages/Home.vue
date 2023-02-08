<template>
<div class="Home">
    <header>
      <h1>Welcome Back!</h1>
    </header>

        <footer>
      <p>Company 
        
        <a href="#">CinemaIL&trade;</a></p>
    </footer>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import "../../assets/Header.css";

.Home {
        display: flex;
        flex-direction: column;
    min-height: 75vh;
        justify-content: space-between;
padding: 0;
  margin: 0;
  background: none;
}

footer {
  opacity: 0.4;
  height: 8vh;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -5px -5px 10px rgb(0, 0, 0, 0.3);
}
footer > p {
  text-align: center;
  font-family: "system-ui";
  letter-spacing: 3px;
}
footer > p > a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.Home h2 {
    margin: 10px;
    color: white;
    
}

.MovieListRecommended {
    text-align: center;
    max-height: 92%;
    display: flex;

   
}
</style>
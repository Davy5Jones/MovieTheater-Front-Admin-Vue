
<template>
    <div class="wrapper">
<div className="Main">
<router-view>

</router-view>
</div></div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.Main {
    margin: 0;
border-collapse: separate; 


box-shadow: 0 0 10px rgb(161, 161, 161);
  background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png)
    no-repeat top center;
    min-height: 75vh;
    overflow: hidden;


}
.wrapper{
    background-image: linear-gradient(to right, #45323d, #473442, #483648, #48394f, #473c55, #443c55, #423b56, #3f3b56, #3c3750, #38344a, #353045, #312d3f)  ;
    min-height: 75vh;
margin: 10px 50px;
    border-radius: 12px;   
     grid-column: 9 span;
    overflow: hidden;

}


</style>
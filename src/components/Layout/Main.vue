
<template>
<div className="Main">
<router-view>

</router-view>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.Main {
    grid-column: 9 span;
border-collapse: separate; 

max-height: max-content;    background-color:  var( --primary-color);
min-height: 75vh;
margin: 10px 50px;
    border-radius: 12px;
box-shadow: 0 0 10px rgb(161, 161, 161);


}


</style>
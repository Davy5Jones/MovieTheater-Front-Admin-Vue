<template>
<div class="Home">
        <h2>This is Home!</h2>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.Home {
    align-items: center;
    justify-content: center;
    height: 100%;
}

.Home h2 {
    margin: 10px;
    color: white;
    
}

.MovieListRecommended {
    text-align: center;
    max-height: 92%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    text-align: center;
}
</style>
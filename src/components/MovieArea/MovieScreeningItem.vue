<template>
    <div class="MovieScreeningItem">
        <h3>id: {props.screeningDetails.id}</h3>
        <p>Screen time: {moment(props.screeningDetails.screenTime).format()}</p>
        <p>Theater: {props.screeningDetails.theaterName}</p>
        <router-link 
          to="/screenings/" + props.screeningDetails.id>
          Screening!
        </router-link>
      </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
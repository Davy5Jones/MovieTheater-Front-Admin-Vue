
<template lang="">
    <div className="Header">			<h2>Movie Theater</h2>

        </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
    .Header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var( --heading-color);
	grid-column: 12 span;
    max-height: 5vh;
    align-items: center;
}
.Header *{
    margin: 0;
    padding: 0;
    display: block;
    color: whitesmoke;
}
</style>
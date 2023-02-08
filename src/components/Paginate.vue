<template>
    <div className="Paginate">
        <img  v-if="info.number>0" class="reversed" src="https://cdn.iconscout.com/icon/free/png-256/last-page-1782311-1514161.png"   @click="emit('updateUrl',links.first.href||'')"/>
          <button  v-if="info.number>0" @click="emit('updateUrl',links.prev?.href||'')">
            {{ info.number }}
          </button>
        
        <button class="selected" @click="emit('updateUrl',links.self.href||'')">{{props.info.number +1}}</button>
          <button v-if="info.totalPages-1>info.number" @click="emit('updateUrl',links.next?.href||'')">{{props.info.number +2}}</button>
          <img src="https://cdn.iconscout.com/icon/free/png-256/last-page-1782311-1514161.png"  v-if="info.totalPages-1>info.number" @click="emit('updateUrl',links.last.href||'')"/>
      </div>
</template>

<script setup lang="ts">

import type { PageInfo, PageLinks } from '@/Models/BaseModels';

interface Paginate{
  info:PageInfo,
  links:PageLinks,
}


const props= defineProps<Paginate>()
const emit = defineEmits<{
  (e: 'updateUrl', value: string): void
}>()
</script>

<style scoped>
.Paginate {
  position: relative;
    margin:10px;
    min-height: 35px;
    align-items: center;
    text-align:center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
    bottom: 5px;
}
button{   cursor: pointer;

    background-color:var(--primary-color);
    border: none;
    height: 30px;
    width: 30px;
    border-radius: 3px;
    color: white;
    margin: 2px; 
    opacity: 0.7;

}
.selected{
      background-color:var(--secondary-color);

}
img{   cursor: pointer;

  
  margin: 0;
  padding: 0;
      height: 30px;
    width: 30px;
    
}
.reversed{
  transform: rotate(180deg);
}
</style>
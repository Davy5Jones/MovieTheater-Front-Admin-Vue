<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import * as yup from "yup";
import type {ScreeningModelDao} from "../../Models/ScreeningModel";
interface NewScreening{
    screening:ScreeningModelDao,
    errors:{ [key: string]: string; }
}
const schema = yup.object().shape({
  screenTime: yup
    .date()
    .required("screen time is required")
    .min(new Date(), "Screen time cannot be in the past")
    .max(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date;
    }, "We can schedule screenings only one year ahead..."),
  theaterName: yup.string().required("Theater is required"),
  threeD: yup.boolean(),
  active: yup.boolean(),
});

const loginForm = ref<NewScreening>({
    screening:{
        movieId:"",
  screenTime:new Date(0),
  theaterName:"",
  threeD:false,
  active:false
    },
    errors:{
movieId:"",
  screenTime:"",
  theaterName:"",
  threeD:"",
  active:""
    }
})

function validate(field:string) {
    schema.validateAt(field,loginForm.value.screening)
        .then(() => (loginForm.value.errors[field] = ""))
        .catch((err) => {
          loginForm.value.errors[err.path] = err.message;
        });
    }

    const isDirty=ref<boolean>(false);
 const disable= computed<boolean>(()=> {
    let isDisabled=false;
    Object.keys(loginForm.value.errors).forEach(err => {
        if(err!=="") isDisabled=true;
    })
    return isDisabled;
    

 })
</script>
<style scoped></style>

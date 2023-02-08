<template>
  <div class="wrapper">
    <header>
      <h1>New movie</h1>
    </header>
    <main>
      <form
        method="get"
        id="login_form"
        class="form_class"
        @submit="() => submitMovie()"
      >
        <div class="form_div">
          <div class="Row">
            <div class="InWrap-Half">
              <input
                v-model="movieForm.movie.name"
                class="field_class"
                type="text"
                :placeholder="'Movie Name'"
                @blur="validate('name')"
                @keypress="validate('name')"
                @input="validate('name')"
              /><label>{{ movieForm.errors["name"] }}</label>
            </div>
            <div class="InWrap-Half">
              <select
                v-model="movieForm.movie.genre"
                class="field_class"
                @blur="validate('genre')"
                @keypress="validate('genre')"
                @click="validate('genre')"
                @input="validate('genre')"
              >
                <option disabled value="">Select Genre</option>

                <template v-for="genre in MovieGenre">
                  <option :value="genre">
                    {{ Capitalize(genre) }}
                  </option></template
                >
              </select>
              <label>{{ movieForm.errors.genre }}</label>
            </div>
          </div>
           <div class="Row">
          <div class="InWrap-Half">
            <label>Duration:</label>
            <input
              v-model="movieForm.movie.duration"
              class="field_class"
              type="number"
              :placeholder="movieForm.errors['duration'] || 'duration'"
              @blur="validate('duration')"
              @keypress="validate('duration')"
              @input="validate('duration')"
            />
          </div>
          <div class="InWrap-Half">
            <label>Rating:</label>
            <input
              v-model="movieForm.movie.rating"
              class="field_class"
              type="number"
              :placeholder="movieForm.errors['rating'] || 'rating'"
              @blur="validate('rating')"
              @keypress="validate('rating')"
              @input="validate('rating')"
            />
            </div>
            </div>
            <div class="Row"><div class="InWrap-Desc">
            <label>{{movieForm.errors['description']||'Description'}}</label>
            <textarea name="Text1" cols="40" rows="5"
              v-model="movieForm.movie.description"
              class="field_class"
              type="text"
              :placeholder="movieForm.errors['description'] || 'description'"
              @blur="validate('description')"
              @keypress="validate('description')"
              @input="validate('description')"
            ></textarea></div></div>
            <label>Image:</label>
          
          <div class="InWrap">
            <input
              v-model="movieForm.movie.img"
              class="field_class"
              type="text"
              :placeholder="movieForm.errors['img'] || 'Image'"
              @blur="validate('img')"
              @keypress="validate('img')"
              @input="validate('img')"
            />
          </div>
          <div class="InWrap">
            <label>Trailer:</label>
            <input
              v-model="movieForm.movie.trailer"
              class="field_class"
              type="text"
              :placeholder="movieForm.errors['trailer'] || 'trailer'"
              @blur="validate('trailer')"
              @keypress="validate('trailer')"
              @input="validate('trailer')"
            />
          </div>
          <button :disabled="active" class="submit_class">Submit</button>
        </div>
      </form>
    </main>
    <footer>
      <p>
        Company

        <a href="#">CinemaIL&trade;</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import webApi from "../../Services/WebApi";
import * as yup from "yup";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import notify from "../../Services/NotificationService";
import { Capitalize } from "../../Helper";
import type { MovieModelDao } from "@/Models/MovieModel";
import { MovieGenre } from "@/Models/MovieModel";

interface MovieForm {
  movie: MovieModelDao;
  errors: { [key: string]: string };
}
const url =
  "https://static01.nyt.com/images/2018/05/15/science/15SCI-OUTTHERE1/merlin_137951508_848022bd-19dc-40e4-89ce-3ab3b3c24847-superJumbo.jpg";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("name required")
    .min(3, "too short!")
    .max(40, "Too many chars!"),
  description: yup
    .string()
    .required("description is required")
    .max(250, "Too many chars!"),
  duration: yup
    .number()
    .required("Movie duration is required")
    .min(40, "Minimum 40 minutes!")
    .max(180, "Maximum 3 hours!"),
  genre: yup.string().required("Genre required"),
  rating: yup
    .number()
    .required("rating is required")
    .min(1, "Must be between 1 and 5")
    .max(5, "Must be between 1 and 5"),
  img: yup.string().required("Movie image is required"),
  trailer: yup.string().required("Movie trailer is required"),
});
const isDirty = computed(()=>{
  let obj:any;
    obj=movieForm.value.movie
  for (const key in movieForm.value.movie) {
    
    if (!obj[key]) return false;
  }
  return true;
});

const movieForm = ref<MovieForm>({
  movie: {
    name: "",
    description: "",
    duration: 0,
    genre: "",
    rating: 0,
    img: "",
    trailer: "",
  },
  errors: {
    name: "",
    description: "",
    duration: "",
    genre: "",
    rating: "",
    img: "",
    trailer: "",
  },
});
const route = useRouter();
async function submitMovie() {
  await schema
    .validate(movieForm.value.movie)
    .then(() => {
      webApi.AddMovie(movieForm.value.movie).then((res) => {
        route.push("/movies/" + res.data.id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function validate(field: string) {
  schema
    .validateAt(field, movieForm.value.movie)
    .then(() => (movieForm.value.errors[field] = ""))
    .catch((err) => {
      movieForm.value.errors[err.path] = err.message;
    });
}

const active = computed<boolean>(() => {
  console.log(isDirty.value);
  return !isDirty.value || anyErrors.value;
});



const anyErrors = computed<boolean>(() => {
  for (const key of Object.keys(movieForm.value.errors)) {
    if (movieForm.value.errors[key] !== "") {
      return true;
    }
  }
  return false;
});
</script>

<style scoped>
.Row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}
.wrapper {
  min-height: 75vh;

  padding: 0;
  margin: 0;
  background: none;
}

* {
  padding: 0px;
  margin: 0px;
}
body {
}
header {
  opacity: 0.6;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
}
h1 {
  letter-spacing: 1.5vw;
  font-family: "system-ui";
  text-transform: uppercase;
  text-align: center;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
}
.form_class {
  width: 500px;
  padding: 40px;
  border-radius: 8px;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.618);
  font-family: "system-ui";
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
}
.form_div {
}
.form_div > label {
  letter-spacing: 3px;
  font-size: 1rem;
}
.info_div {
  text-align: center;
  margin-top: 20px;
}
.info_div {
  letter-spacing: 1px;
}
.field_class {
  width: 100%;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  padding: 5px 0px;
  text-indent: 6px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "system-ui";
  font-size: 0.9rem;
  letter-spacing: 2px;
  height: 60%;
}
.submit_class {
  border-style: none;
  border-radius: 5px;
  background-color: #ffe6d4;
  padding: 8px 20px;
  font-family: "system-ui";
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: block;
  margin: auto;
  margin-top: 10px;
  box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.2);
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
 textarea { resize: none; }
.InWrap-Half {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 60px;
  margin: 0 5px;
}
.InWrap,
.InWrap-Half > * {
  margin: 0;
  padding: 0;
}

.InWrap-Desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 120px;
  margin: 0 5px;
}
</style>

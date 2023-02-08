<template>
  <div class="wrapper">
    <header>
      <h1>Welcome Back!</h1>
    </header>
    <main>
      <form
        id="register_form"
        class="form_class"
                    @submit="()=>submitLogin()"
      >
        <div class="form_div">
          <label>Email:</label>
          <input
             v-model="formRegister.registerModel.email"
            class="field_class"
            name="login_txt"
            type="text"
            :placeholder="formRegister.errors['email']||'Email'"
            autofocus

            @blur="validate('email')" 
            @keypress="validate('email')"
                        @input="validate('email')"
          />
          <label>Password:</label>
          <input

           v-model="formRegister.registerModel.password"

            id="pass"
            class="field_class"
            name="password_txt"
            type="password"
            :placeholder="formRegister.errors['password']||'Password'"

            @blur="validate('password')" 
            @keypress="validate('password')"
                        @input="validate('password')"

          />
          <button
            class="submit_class"
            type="submit"
            form="login_form"
          >
            Submit
          </button>
        </div>
        <div class="info_div">
          <p>
            Not registered yet?

             <router-link to="/home/register"  
      >Register Here!</router-link
    >
          </p>
        </div>
      </form>
    </main>
    <footer>
      <p>Company 
        
        <a href="#">CinemaIL&trade;</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import webApi from "../../Services/WebApi";
import type { LoginModel, RegisterModel } from "../../Models/BaseModels";
import * as yup from "yup";
import Store, { actions } from "../../Vuex/Store";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import notify from "../../Services/NotificationService";

interface FormLogin {
  registerModel: RegisterModel;
  errors: { [key: string]: string };
}
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email pattern")
    .required("Email is required")
    .max(40, "too many chars!"),
  password: yup
    .string()
    .min(4, "password length minimum is 4 letters")
    .required("Password is required")
    .max(40, "too many chars!"),
    name: yup
    .string()
    .min(3,"We need at lest 3 characters!")
    .required("Email is required")
    .max(40, "too many chars!"),
});
const isDirty = ref<boolean>(false);

const formRegister = ref<FormLogin>({
  registerModel: { email: "", password: "",name:"" },
  errors: {
    email: "",
    password: "",
  },
});
const route = useRouter();
function submitLogin() {
  webApi
    .login({
      email: formRegister.value.registerModel.email,
      password: formRegister.value.registerModel.password,
    })
    .then((res) => {
      Store.dispatch(actions.SET_IS_LOGGED, true);

      route.push({ path: "/home" });
    })
    .catch((err) => {
      notify.error(err);
    });
}

function validate(field: string) {
  console.log("vali");
  schema
    .validateAt(field, formRegister.value.registerModel)
    .then(() => (formRegister.value.errors[field] = ""))
    .catch((err) => {
      formRegister.value.errors[err.path] = err.message;
    });
}

const active = computed<boolean>(() => {
  return (
    !isDirty.value ||
    !(
      formRegister.value.errors["email"] === "" &&
      formRegister.value.errors["password"] === ""
    )
  );
});
</script>

<style scoped>
.wrapper {
  background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png)
    no-repeat center center;
  background-size: cover;
  border-radius: 12px;
  overflow: hidden;
}
* {
  padding: 0px;
  margin: 0px;
}
body {
  background-color: lightgreen;
}
header {
  opacity: 0.5;
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
  height: 60vh;
  width: 100%;
}
.form_class {
  width: 500px;
  padding: 40px;
  border-radius: 8px;
  background-color: white;
  font-family: "system-ui";
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
}
.form_div {
  text-transform: uppercase;
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
  margin-bottom: 20px;
  font-family: "system-ui";
  font-size: 0.9rem;
  letter-spacing: 2px;
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
  cursor: pointer;
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
</style>

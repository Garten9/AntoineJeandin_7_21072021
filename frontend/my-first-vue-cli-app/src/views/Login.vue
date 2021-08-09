<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-10 mx-auto mt-3 rounded-3 bg-white">
        <img
          class="w-50 mt-5"
          alt="groupomania logo"
          src="../assets/logo-above.png"
        />
        <h1 class="h2 mt-3">Connexion</h1>
        <form
          method="post"
          class="w-75 needs-validation mx-auto text-start"
          novalidate
          id="form"
        >
          <div class="form-group my-3">
            <label for="email">adresse e-mail</label>
            <input
              id="email"
              class="form-control"
              type="email"
              name="email"
              v-model="email"
              required
            />
            <div class="invalid-feedback">
              Veuillez renseigner votre adresse email
            </div>
          </div>
          <div class="form-group my-3">
            <label for="password">Mot de passe</label>
            <input
              class="form-control"
              type="password"
              name="password"
              id="password"
              v-model="password"
              required
            />
            <div class="invalid-feedback">
              Veuillez renseigner votre mot de passe
            </div>
          </div>
          <div class="row my-3">
            <button
              type="button"
              @click="login()"
              class="btn btn-primary w-25"
              style="min-width: 130px"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let form = document.querySelector("#form");
      if (form.checkValidity() == false) {
        form.classList.add("was-validated");
      } else {
        axios
          .post("http://localhost:3000/api/auth/login", {
            email: this.email,
            password: this.password,
          })
          .then(function (response) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("moderator", response.data.moderator);

            window.location = "http://localhost:8080/#/accueil";
          })
          .catch(function (error) {
            if (error.response && error.response.status == 401) {
              alert("Email ou Mot de passe invalide");
            } else {
              alert("Une erreur est survenue");
            }
          });
      }
    },
  },
};
</script>
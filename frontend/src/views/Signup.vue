<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-10 mx-auto mt-3 rounded-3 bg-white">
        <img
          class="w-50 mt-5"
          alt="groupomania logo"
          src="../assets/logo-above.png"
        />
        <h1 class="h2 mt-3">Inscription</h1>
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
            <label for="email">pseudo</label>
            <input
              id="pseudo"
              class="form-control"
              type="text"
              name="pseudo"
              v-model="pseudo"
              required
            />
            <div class="invalid-feedback">Veuillez renseigner votre pseudo</div>
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
          <div class="form-group my-3">
            <label for="password">Confirmtion de mot de passe</label>
            <input
              class="form-control"
              type="password"
              name="repassword"
              id="repassword"
              v-model="repassword"
              required
            />
            <div class="invalid-feedback">
              Veuillez renseigner à nouveau votre mot de passe
            </div>
          </div>
          <div class="row my-3">
            <button
              type="button"
              @click="signup()"
              class="btn btn-primary w-25"
              style="min-width: 130px"
            >
              Inscription
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
  name: "Signup",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    signup() {
      let form = document.querySelector("#form");
      if (form.checkValidity() == false) {
        form.classList.add("was-validated");
      } else if (this.password != this.repassword) {
        alert("Les deux mot de passe doivent être identiques");
      } else {
        axios
          .post("http://localhost:3000/api/auth/signup", {
            email: this.email,
            password: this.password,
            pseudo: this.pseudo,
          })
          .then(function (response) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("moderator", "false");

            window.location = "http://localhost:8080/#/accueil";
          })
          .catch(function (error) {
            if (
              error.response.data.error.name &&
              error.response.data.error.name == "SequelizeUniqueConstraintError"
            ) {
              alert("Cet email est déjà utilisé par un autre utilisateur");
            } else {
              alert("Une erreur est survenue");
            }
          });
      }
    },
  },
};
</script>
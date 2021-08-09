<template>
  <div class="Accueil container-fluid">
    <h1>Bienvenue</h1>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Accueil",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    getPosts() {
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
  beforeCreate() {
    if (sessionStorage.getItem("token") == null) {
            window.location = "http://localhost:8080/";
    } 
  },
};
</script>
<template>
  <div class="ChangePassword container-fluid">
    <div class="row px-2">
      <div
        class="mx-auto mt-3 p-2 rounded-3 bg-white position-relative text-start"
      >
        <form
          method="post"
          class="w-75 needs-validation mx-auto text-start"
          novalidate
          id="form"
        >
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
              @click="changePassword()"
              class="btn btn-primary"
              style="min-width: 130px"
            >
              Modifier le mot de passe
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
  name: "ChangePassword",
  data() {
    return {
      password: "",
      repassword: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    changePassword() {
      let form = document.querySelector("#form");
      if (form.checkValidity() == false) {
        form.classList.add("was-validated");
      } else if (this.password != this.repassword) {
        alert("Les deux mot de passe doivent être identiques");
      } else {
        axios
          .put(
            "http://localhost:3000/api/auth/password/" + this.userId,
            {
              password: this.password,
              userId: this.userId,
            },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          )
          .then(() => (window.location = "http://localhost:8080/#/compte"))
          .catch(function (error) {
            console.log(error);
            alert("Une erreur est survenue");
          });
      }
    },
  },
  beforeCreate() {
    if (sessionStorage.getItem("token") == null) {
      this.$store.commit("LOG_OUT");
      window.location = "http://localhost:8080/";
    } else {
      this.$store.commit("LOG_IN");
    }
  },
};
</script>
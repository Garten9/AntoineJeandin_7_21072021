<template>
  <div class="Compte container-fluid">
    <div class="row px-2">
      <div
        class="mx-auto mt-3 p-2 rounded-3 bg-white position-relative text-start"
      >
        <h1 class="text-primary">Mes informations</h1>
        <ul class="text-start">
          <li>
            Pseudo : <strong>{{ user.pseudo }}</strong>
          </li>
          <li>
            Email : <strong>{{ user.email }}</strong>
          </li>
          <li v-if="user.biography">
            Biographie : <strong>{{ user.biography }}</strong>
          </li>
        </ul>
        <button class="btn btn-danger" @click="deleteAccount()">
          Supprimer mon compte
        </button>
      </div>
      <div
        class="mx-auto mt-3 p-2 rounded-3 bg-white position-relative text-start"
      >
        <h2 class="text-primary">Modifiez vos informations</h2>
        <form>
          <label for="biography" class="form-label"
            >Ajouter une biographie</label
          >
          <textarea
            class="form-control"
            id="biography"
            rows="3"
            placeholder="Parlez-nous de vous..."
            required
            v-model="biography"
          ></textarea>
          <div class="my-2 text-start">
            <label for="formFile" class="form-label"
              >Ajouter une photo de profil</label
            >
            <input class="form-control" type="file" id="formFile" />
          </div>
          <div class="my-3 text-end">
            <button
              type="button"
              @click="modifyUser()"
              class="btn btn-primary w-25"
              style="min-width: 130px"
            >
              modifier
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
  name: "Compte",
  data() {
    return {
      biography: "",
      user: [],
      userId: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/auth/" + this.userId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then(() => (window.location = "http://localhost:8080/"))
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenue");
        });
    },
    modifyUser() {
      axios
        .put(
          "http://localhost:3000/api/auth/" + this.userId,
          { biography: this.biography },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then(() => window.location.reload())
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenue");
        });
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
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/" + this.userId, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.user = response.data))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
  },
};
</script>
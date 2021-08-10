<template>
  <div class="Compte container-fluid">
    <div class="row px-2">
      <div v-for="user in users" :key="user.id">
        <div
          class="
            mx-auto
            mt-3
            p-2
            rounded-3
            bg-white
            position-relative
            text-start
          "
          v-if="user.id != userId"
        >
          <img
            v-if="user.img_url"
            :src="user.img_url"
            alt="photo de profil du compte"
            width="70"
            class="ms-4 mb-2"
          />
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
          <button class="btn btn-danger" @click="deleteAccount(user.id)">
            Supprimer ce compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Moderator",
  data() {
    return {
      users: [],
      userId: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    deleteAccount(userId) {
      axios
        .delete("http://localhost:3000/api/auth/" + userId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then(() => window.location.reload())
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
      .get("http://localhost:3000/api/auth/", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.users = response.data))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
  },
};
</script>
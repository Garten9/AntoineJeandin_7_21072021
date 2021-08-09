<template>
  <div class="post container-fluid">
    <div class="row">
      <div class="col-10 mx-auto mt-3 rounded-3 bg-white position-relative">
        <p class="text-primary text-start">{{ pseudoDate }}</p>
        <p class="text-start">{{ postData.message }}</p>
        <div v-if="postData.user_id == userId" class="position-absolute m-2" style="top: 0px; right: 0px">
          <img src="../assets/modify.png" alt="icon modify" width="25" />
          <img
            src="../assets/delete.png"
            alt="icon delete"
            width="20"
            class="ms-2"
            @click="deletePost()"
          />
        </div>
        <h1 class="h2 mt-3">Connexion</h1>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Post",
  data() {
    return {
      pseudo: "",
      userId: sessionStorage.getItem('userId'),
    };
  },
  props: {
    postData: Object,
  },
  computed: {
    pseudoDate() {
      const datePost = this.postData.createdAt.split("T");
      const date = datePost[0].split("-");
      const heure = datePost[1].split(":");

      return (
        this.pseudo +
        " - " +
        date[2] +
        "/" +
        date[1] +
        "/" +
        date[0] +
        " à " +
        heure[0] +
        "h" +
        heure[1]
      );
    },
  },
  methods: {
    deletePost() {
      axios
        .delete("http://localhost:3000/api/posts/" + this.postData.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then(() => (window.location.reload()))
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenue");
        });
    },
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/" + this.postData.user_id, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.pseudo = response.data.pseudo))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });

    // axios
    //   .get("http://localhost:3000/api/comment/" + this.postData.user_id, {
    //     headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    //   })
    //   .then((response) => (this.pseudo = response.data.pseudo))
    //   .catch(function (error) {
    //     console.log(error);
    //     alert("Une erreur est survenue");
    //   });
  },
};
</script>



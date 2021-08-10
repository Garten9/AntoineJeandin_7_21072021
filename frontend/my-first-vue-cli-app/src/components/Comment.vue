<template>
  <div class="text-start rounded-3 bg-gray my-2 p-2 row w-100 mx-auto">
    <div class="col-auto px-0 pt-1" v-if="user.img_url">
      <img :src="user.img_url" alt="image de profil user" width="50" />
    </div>
    <div class="col">
      <div class="text-primary">{{ pseudoDateComment }}</div>
      <div>{{ commentData.message }}</div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Comment",
  data() {
    return {
      user: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  props: {
    commentData: Object,
    // postId: Number,
  },
  computed: {
    pseudoDateComment() {
      const datePost = this.commentData.createdAt.split("T");
      const date = datePost[0].split("-");
      const heure = datePost[1].split(":");

      return (
        this.user.pseudo +
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
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/" + this.commentData.user_id, {
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

<style scoped>
.bg-gray {
  background-color: #e8e8e8;
}
</style>



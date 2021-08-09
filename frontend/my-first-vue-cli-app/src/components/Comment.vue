<template>
  <div class="text-start rounded-3 bg-gray my-2 p-2">
    <div class="text-primary">{{ pseudoDateComment }}</div>
    <div>{{ commentData.message }}</div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Comment",
  data() {
    return {
      pseudo: "",
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
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/" + this.commentData.user_id, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.pseudo = response.data.pseudo))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
  },
};
</script>

<style scoped>
.bg-gray {
  background-color: #E8E8E8;
}
</style>



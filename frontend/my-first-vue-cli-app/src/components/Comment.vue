<template>
  <!-- <div class="post container-fluid">
    <div class="row">
      <div class="col-10 mx-auto mt-3 rounded-3 bg-white position-relative">
        <p class="text-primary text-start">{{ pseudoDate }}</p>
        <p class="text-start">{{ postData.message }}</p>
        <div
          v-if="postData.user_id == userId"
          class="position-absolute m-2"
          style="top: 0px; right: 0px"
        >
          <img src="../assets/modify.png" alt="icon modify" width="25" />
          <img
            src="../assets/delete.png"
            alt="icon delete"
            width="20"
            class="ms-2"
            @click="deletePost()"
          />
        </div>
        <div class="border-top pt-2">
          <form>
            <textarea
              class="form-control"
              id="messageComment"
              rows="1"
              placeholder="Votre commentaire..."
              required
              v-model="commentMessage"
            ></textarea>
            <div class="my-3 text-end">
              <button
                type="button"
                @click="addComment()"
                class="btn btn-primary w-25"
                style="min-width: 130px"
              >
                Commenter
              </button>
            </div>
          </form>
        </div>
        <div>
          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :commentData="comment"
            :postId="postData.id"
          />
        </div>
      </div>
    </div>
  </div> -->
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



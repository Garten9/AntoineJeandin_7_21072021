<template>
  <div class="post container-fluid">
    <div class="row">
      <div class="col mx-auto mt-3 p-2 rounded-3 bg-white position-relative">
        <p class="text-primary text-start">{{ pseudoDate }}</p>
        <p class="text-start">{{ postData.message }}</p>
        <div
          v-if="postData.user_id == userId || $store.state.moderator == true"
          class="position-absolute m-2"
          style="top: 0px; right: 0px"
        >
          <img src="../assets/modify.png" alt="icon modify" width="25" v-if="postData.user_id == userId"/>
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
          <div v-for="comment in comments" :key="comment.id">
            <Comment v-if="comment.post_id == postData.id" :commentData="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Comment from "@/components/Comment.vue";

export default {
  components: { Comment },
  name: "Post",
  data() {
    return {
      pseudo: "",
      userId: sessionStorage.getItem("userId"),
      commentMessage: "",
    };
  },
  props: {
    postData: Object,
    comments: Object,
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
        .then(() => window.location.reload())
        .catch(function (error) {
          console.log(error.response);
          alert("Une erreur est survenue");
        });
    },
    addComment() {
      axios({
        method: "post",
        url: "http://localhost:3000/api/comments/",
        data: {
          message: this.commentMessage,
          userId: this.userId,
          postId: this.postData.id,
        },
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
  },
};
</script>



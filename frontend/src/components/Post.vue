<template>
  <div class="post container-fluid">
    <div class="row">
      <div class="col mx-auto mt-3 p-2 rounded-3 bg-white position-relative">
        <div class="row">
          <div class="col-auto pe-0" v-if="user.img_url">
            <img :src="user.img_url" alt="image de profil user" width="50" />
          </div>
          <p class="text-primary text-start col">
            {{ user.pseudo }}<br />{{ postDate }}
          </p>
        </div>
        <p class="text-start">{{ postData.message }}</p>
        <img
          :src="postData.img_url"
          alt="image du post"
          v-if="postData.img_url"
          class="w-100 mb-1"
        />
        <div
          v-if="postData.user_id == userId || $store.state.moderator == true"
          class="position-absolute m-2"
          style="top: 0px; right: 0px"
        >
          <router-link :to="updatePostUrl"
            ><img
              src="../assets/modify.png"
              alt="icon modify"
              width="25"
              v-if="postData.user_id == userId"
          /></router-link>

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
            <Comment
              v-if="comment.post_id == postData.id"
              :commentData="comment" :getData="getData"
            />
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
      user: "",
      userId: sessionStorage.getItem("userId"),
      commentMessage: "",
    };
  },
  props: {
    postData: Object,
    comments: Object,
    getData: Function,
  },
  computed: {
    postDate() {
      const datePost = this.postData.createdAt.split("T");
      const date = datePost[0].split("-");
      const heure = datePost[1].split(":");

      return (
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
    updatePostUrl() {
      return "/updatePost/" + this.postData.id;
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
        .then(() => this.getData())
        .catch(function (error) {
          console.log(error.response);
          alert("Une erreur est survenue");
        });
    },
    addComment() {
      if (this.commentMessage != "") {
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
          .then(() => this.getData(), (this.commentMessage = ""))
          .catch(function (error) {
            console.log(error);
            alert("Une erreur est survenue");
          });
      }
    },
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/" + this.postData.user_id, {
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



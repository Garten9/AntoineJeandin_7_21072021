<template>
  <div class="Accueil container-fluid">
    <div class="row px-2">
      <div class="col mx-auto mt-3 p-2 rounded-3 bg-white position-relative">
        <form>
          <textarea
            class="form-control"
            id="messagePost"
            rows="3"
            placeholder="Qu’avez-vous à partager avec vos collègues aujourd’hui ? ..."
            required
            v-model="postMessage"
          ></textarea>
          <div class="my-2 text-start">
            <label for="formFileSm" class="form-label">Ajouter une image</label>
            <input
              class="form-control form-control-sm"
              type="file"
              id="formFile"
              @change="onAddFile"
              accept="image/*"
            />
          </div>
          <div class="my-3 text-end">
            <button
              type="button"
              @click="addPost()"
              class="btn btn-primary w-25"
              style="min-width: 130px"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :postData="post"
      :comments="comments"
      :getData="getData"
    />
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
const axios = require("axios");
export default {
  components: { Post },
  name: "Accueil",
  data() {
    return {
      posts: [],
      comments: [],
      postMessage: "",
      userId: sessionStorage.getItem("userId"),
      imageArray: null,
    };
  },
  methods: {
    onAddFile(event) {
      this.imageArray = event.target.files[0];
    },
    getData() {
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => (this.posts = response.data))
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenue");
        });
      axios
        .get("http://localhost:3000/api/comments/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => (this.comments = response.data))
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenue");
        });
    },
    addPost() {
      if (this.postMessage != "" || this.imageArray != null) {
        var postFormData = new FormData();
        if (this.imageArray != null) {
          postFormData.append("image", this.imageArray, this.imageArray.name);
        }
        postFormData.append("message", this.postMessage);
        postFormData.append("userId", this.userId);
        axios
          .post("http://localhost:3000/api/posts/", postFormData, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then(
            () => this.getData(),
            (this.postMessage = ""),
            (this.imageArray = null),
            document.getElementById('formFile').value = ""
          )
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
      if (sessionStorage.getItem("moderator") == "true") {
        this.$store.commit("MODERATOR_ON");
      }
    }
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/posts/", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.posts = response.data))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
    axios
      .get("http://localhost:3000/api/comments/", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.comments = response.data))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
  },
};
</script>
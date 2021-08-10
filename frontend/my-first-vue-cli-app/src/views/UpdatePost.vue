<template>
  <div class="updatePost container-fluid">
    <div class="row px-2">
      <div class="col mx-auto mt-3 p-2 rounded-3 bg-white position-relative">
        <form>
          <textarea
            class="form-control"
            id="messagePost"
            rows="3"
            placeholder="Qu’avez-vous à partager avec vos collègues aujourd’hui ? ..."
            required
            v-model="post.message"
          ></textarea>
          <div>
            <img
              :src="post.img_url"
              alt="image du post"
              v-if="post.img_url"
              class="w-50 my-1"
            />
          </div>

          <div class="my-2 text-start">
            <label for="formFileSm" class="form-label"
              >Choisir une autre image</label
            >
            <input
              class="form-control form-control-sm"
              type="file"
              id="formFile"
              @change="onAddFile"
            />
          </div>
          <div class="my-3 text-end">
            <button
              type="button"
              @click="updatePost()"
              class="btn btn-primary w-25"
              style="min-width: 130px"
            >
              Modifier
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
  name: "UpdatePost",
  data() {
    return {
      post: [],
      userId: sessionStorage.getItem("userId"),
      imageArray: null,
    };
  },
  methods: {
    onAddFile(event) {
      this.imageArray = event.target.files[0];
    },
    updatePost() {
      var postFormData = new FormData();
      if (this.imageArray != null) {
        postFormData.append("image", this.imageArray, this.imageArray.name);
      }
      postFormData.append("message", this.post.message);
      postFormData.append("userId", this.userId);
      axios
        .put("http://localhost:3000/api/posts/" + this.post.id, postFormData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => (window.location = "http://localhost:8080/#/accueil"))
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
      if (sessionStorage.getItem("moderator") == "true") {
        this.$store.commit("MODERATOR_ON");
      }
    }
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/posts/" + this.$route.params.id, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((response) => (this.post = response.data))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenue");
      });
  },
};
</script>
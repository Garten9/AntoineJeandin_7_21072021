<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-auto">
          <img
            height="60"
            src="@/assets/icon-groupomania.png"
            alt="logo Groupomania"
          />
        </div>

        <nav class="col-auto ms-auto navbar navbar-expand-md navbar-light">
          <button
            class="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
            <ul
              v-if="$store.state.logged == false"
              class="navbar-nav"
            >
              <li class="nav-item active">
                <router-link to="/" class="nav-link">Connexion</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link"
                  >Inscription</router-link
                >
              </li>
            </ul>
            <ul v-else class="navbar-nav">
              <li class="nav-item active">
                <router-link to="/accueil" class="nav-link"
                  >Accueil</router-link
                >
              </li>
              <li v-if="$store.state.moderator == true" class="nav-item active">
                <router-link to="/moderator" class="nav-link"
                  >Moderation</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/compte" class="nav-link"
                  >Mon Compte</router-link
                >
              </li>
              <li class="nav-item">
                <a href="" class="nav-link" @click="logOut()">Déconnexion</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logOut() {
      sessionStorage.clear();
      this.$store.commit('LOG_OUT');
      this.$store.commit('MODERATOR_OFF');
      window.location = "http://localhost:8080/#/";
    },
  },
};
</script>



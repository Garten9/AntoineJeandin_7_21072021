<template>
  <div id="page" class="bg-gray">
    <Header />

    <router-view class="bg-gray pb-3"></router-view>
    <footer class="bg-white">
      <p class="mt-1">Groupomania - 2021</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.bg-gray {
  background-color: #dadada;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html,
body, #page, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
#page {
  display: flex;
  flex-direction: column;
}
footer {
  margin-top: auto;
  height: 30px;
}
</style>

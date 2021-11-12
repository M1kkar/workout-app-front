<template>
        <router-view/>
</template>

<script>


export default {
  name: 'App',
  components: {},

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: "lex";
  src: local("lex"), url(./fonts/LexendGiga-Bold.ttf) format("truetype");

}
@font-face {
  font-family: "exa";
  src: local("exa"), url(./fonts/LexendExa-Bold.ttf) format("truetype");
}


</style>

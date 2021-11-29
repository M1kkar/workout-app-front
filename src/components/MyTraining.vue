<template>
  <div class="flexbox-container">
    <my-header></my-header>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
export default {
  //TODO Rozkminić coś w rodzaju "kreatora treningowego" no i skończyć formatke front
  components:{
    'my-footer': Footer,
    'my-header' : Header,
  },

}
</script>

<style scoped>

</style>

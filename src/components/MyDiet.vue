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
  //TODO  w tej formatce poza tym żeby ją skończyć, zrobić formularz w którym użytkownik poda Kalorie, i makroskładniki zwalidować je po stronie frontu tak żeby suma makrosładników zgadzała sie z kcal


  components:{
    'my-footer': Footer,
    'my-header' : Header,
  },

}
</script>

<style scoped>

</style>

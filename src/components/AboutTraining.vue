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
  components: {
    'my-footer': Footer,
    'my-header': Header,
  },
}
</script>

<style scoped>

</style>

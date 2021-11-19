<template>
  <div class="flexbox-containter">
    <div class="header">
      <div class="logo">
        <a v-on:click="changeRoute('/dashboard')"><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
      </div>

    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
export default {
  components:{
    'my-footer': Footer,
  },
  methods:{
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if(error.name !== "NavigationDuplicated"){
          throw error;
        }
      });
    },
  }

}
</script>

<style scoped>

</style>

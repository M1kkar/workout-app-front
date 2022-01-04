<template>
  <div class="flexbox-container">
   <my-header/>
    <div class="first-content">
      <div class="first-content-inf">
        <div class="first-content-text-div">
          <div class="content-text">
            <p>DODAJ SWÓJ TRENING</p>
          </div>
          <div class="content-button">
            <a v-on:click="changeRoute('/myTraining')"><button class="reg-button"><p>DODAJ TRENING</p></button></a>
          </div>
        </div>

      </div>
    </div>
    <div class="second-content">
      <div class="second-content-inf">
        <div class="second-content-text-div">
          <p>DODAJ LUB EDYTUJ POMAIRY SWOJEGO CIAŁA</p>
        </div>
        <div class="second-content-button">
          <a v-on:click="changeRoute('/myProfile')"><button class="reg-button"><p>POMIARY CIAŁA</p></button></a>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="cont-inf">
        <p>JEŚLI MASZ JAKIEŚ PYTANIA ODEZWIJ SIĘ</p>
      </div>
      <div class="e-mail">
        <p>bestworkout@email.com</p>
      </div>
    </div>
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

  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    }
  }
}
</script>

<style>
.flexbox-container {

  max-width: 1600px;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;

}

.first-content{
  min-height: 672px;
  background: #EBE8E8;
  display: flex;
  justify-content: center;
  text-align: center;

}
.first-content-inf{
  padding-top: 200px;
  max-width: 500px;
}

.first-content-text-div{
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}



.second-content{
  min-height: 672px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  text-align: center;
}
.second-content-inf{
  padding-top: 200px;
  max-width: 500px;
}
.second-content-text-div{
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}


</style>

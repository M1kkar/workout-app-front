<template>
  <div class="flexbox-container">
    <my-header></my-header>
    <div class="diet-container">
      <div class="div-with-inputs">
        <div class="inputs-div">
          <div class="input">Białka(g): <input v-model="diet.protein" type="text"></div>
          <div class="input">Węglowodany(g): <input v-model="diet.carbohydrates" type="text"></div>
          <div class="input">Tłuszcze(g): <input v-model="diet.fat" type="text"></div>
          <div class="input">Kalorie(Kcal): <input v-model="diet.kcal" type="text"></div>
          <a v-on:click="updateDiet"><button class="login-button"><p>Aktualizuj</p></button></a>
        </div>
      </div>
      <div class="div-with-inf">
        <h3>Białka <span style="color: #C1A65F">1g = 4kcal </span></h3>
        <h3>Węglowodany <span style="color: #C1A65F">1g = 4kcal</span></h3>
        <h3>Tłuszcze <span style="color: #C1A65F">1g = 9kcal</span></h3>
        <h3>Pamiętaj aby suma markoskładników</h3>
        <h3>(Białka, Węglowodany, Tłuszcze),</h3>
        <h3><span style="color: #C1A65F">była zgodna z ilością Kalorii. </span></h3>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import endpoint from "../endpoint.json";

export default {

  mounted() {
    this.getDiet();
  },

  data(){
    return{
      diet:[],


    }
  },

  components: {
    'my-footer': Footer,
    'my-header': Header,
  },

  methods:{

    getDiet(){
      this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn'));

      axios.get(`${endpoint.url}/myDiet/getDiet/${this.dataFromSession.email}` )
      .then((response)=>{
        if(response.status===200){
          this.diet = response.data;
        }
      })
    },

    updateDiet(){
      axios.post(`${endpoint.url}/myDiet/updateDiet`, this.diet)
          .then((response)=>{
            if(response.status===200){
              this.$swal("", "Pomyślnie zaktualizowano dietę", "success");
            }
          }).catch(()=>{
            this.$swal("Ops...", "Popraw wporwadzone dane", "error");
      })
    },


  }


}
</script>

<style scoped>
.diet-container {
  min-height: 672px;
  background-color: #EBE8E8;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;

}

.div-with-inputs {
  display: flex;
  min-height: 672px;
  margin-left: 150px;

}

.inputs-div {
  align-self: center;
  flex-direction: row;
  font-family: lex;
  max-width: 165px;
  text-align: center;

}

.inputs-div input {
  padding: 8px 41px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px 9px;
  text-align: center;

}

.input {
  text-align: left;
}

.input input {
  margin-right: auto;
  margin-left: auto;
}
.div-with-inf{
  font-family: lex;
  font-size: 14px;
}

.login-button{
  border: solid 1px black;
  border-radius: 24px;
}

</style>

<template>
  <div class="flexbox-container">
    <my-header></my-header>
    <div class="diet-container">
      <div class="test">
      <div class="inputs-div">
          <div class="input">Kalorie(Kcal) <input type="text" ></div>
          <div class="input">Białko <input type="text" ></div>
          <div class="input">Węglowodany <input type="text" ></div>
          <div class="input">Tłuszcze <input type="text" ></div>
      </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
export default {
  components:{
    'my-footer': Footer,
    'my-header' : Header,
  },

}
</script>

<style scoped>
.diet-container{
  min-height: 672px;
  background-color: #EBE8E8;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.test{
  display: flex;
  min-height: 672px;

}
.inputs-div{
  align-self: center;
  flex-direction: row;
  font-family: lex;

}
.inputs-div input{
  padding: 8px 41px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px 9px;
  text-align: center;

}
.input{
  text-align: left;
}

</style>

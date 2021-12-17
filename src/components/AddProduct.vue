<template>
  <div class="flexbox-container">
    <my-header/>
    <div class="main-div">
      <div class="header-div">
        <div class="text"><h2>Wprowadź Dane <span style="color:#C1A65F;">produktu</span></h2></div>
        <div class="text"><h4>Na 100 gramów </h4></div>
      </div>
      <div class="form-div">
        <div class="all-text">
          <div class="text">Nazwa:</div>
          <div class="text">Białka:</div>
          <div class="text">Tłuszcze:</div>
          <div class="text">Węglowodany:</div>
        </div>
        <div class="all-inputs">
          <div class="input"><input v-model="productForm.productName"  type="text"></div>
          <div class="input"><input v-model="productForm.protein" type="text"></div>
          <div class="input"><input v-model="productForm.fat" type="text"></div>
          <div class="input"><input v-model="productForm.carbohydrate" type="text"></div>
        </div>
      </div>
      <a v-on:click="addProduct"><button class="login-button">Dodaj</button></a>
    </div>
    <my-footer/>
  </div>
</template>


<script>
import Footer from "./Footer";
import Header from "./Header";
import endpoint from "../endpoint.json"
import axios from "axios";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    'my-footer': Footer,
    'my-header': Header,
  },

  data(){
    return{
      productForm:{
        productName:'',
        kcal:'',
        protein:'',
        fat:'',
        carbohydrate:'',
      }
    }
  },
  validations: {
    productForm: {
      productName: {required},
      protein: {required},
      fat: {required},
      carbohydrate: {required}
    }
  },

  methods:{

    addProduct() {
      this.$v.productForm.$touch();
      if (this.$v.productForm.$error) {
        this.$swal("Ops..", "Musisz wypełnić wszystkie pola!", "error")
      } else {

        axios.post(`${endpoint.url}/products/add`, this.productForm)
            .then((response) => {
              if (response.status === 200) {
                this.$swal("", "Pomyślnie dodano produkt do bazy ! ", "success")
                location.reload();
              }
            }).catch(() => {
          this.$swal("Ops...", "Złe dane lub produkt znajduje sie już w bazie", "error")
        })
      }
    }

  }
}

</script>
<style scoped>
.main-div {
  min-height: 672px;
  background-color: #EBE8E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: lex;
}

.header-div {
  padding: 30px;

}

.header-div .text {
  text-align: center;
}

.all-text .text{
  padding: 20px;
}

.input {
  padding: 10px;

}

.form-div {
  max-width: 400px;
  display: flex;
  flex-direction: row;
}

.form-div .input input {
  padding: 10px 0px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
  align-items: center;

}
</style>

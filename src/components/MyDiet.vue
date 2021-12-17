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
          <a v-on:click="updateDiet">
            <button class="login-button"><p>Aktualizuj</p></button>
          </a>
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
    <div class="add-products-container">
      <div class="add-products-form-div">
        <div class="custom-select">


          <section class="dropdown-wrapper">
            <div v-on:click="isVisible = !isVisible" class="selected-items">
              <span v-if="productsInDay.products">{{ productsInDay.products.productName }}</span>
              <span v-else> Wybierz Produkt </span>
              <svg
                  :class="isVisible ? 'dropdown' : ''"
                  class="drop-down-icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 8l6 6H6z"/>
              </svg>
            </div>
            <div :class="isVisible ? 'visible': 'invisible'" class="dropdown-popover">
              <input v-model="searchQuery" type="text" placeholder="Znajdź produkt"/>
              <span v-if="filteredProducts.length === 0" style="font-size: 10px">Nie ma produktu? Dodaj go <br>
                <a v-on:click="changeRoute('/addProduct')"><button class="login-button2">Dodaj</button></a>
              </span>
              <div class="options">
                <ul>
                  <li @click="selectItem(products)" v-for="(products, i) in filteredProducts" v-bind:key="i">
                    {{ products.productName }}
                  </li>
                </ul>
              </div>
            </div>
          </section>


        </div>
        <div class="form">
          <div class="all-text">
            <div class="text">Ilość(g):</div>

          </div>
          <div class="all-inputs">
            <div class="input"><input v-model="productsInDay.productSize" type="text"></div>

          </div>
        </div>
        <div class="button"><a v-on:click="addProductToDay"><button class="login-button"><span style="font-size: 12px"> Dodaj </span></button></a></div>
      </div>


      <div class="products-in-day">

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
    this.getAllProducts();
  },

  data() {
    return {
      diet: [],
      allProducts: [],

      searchQuery: '',

      productsInDay: {
        products: '',
        productSize: '',
        diet:[],
      },

      isVisible: false,

    }
  },

  components: {
    'my-footer': Footer,
    'my-header': Header,
  },

  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase()
      if (this.searchQuery === "") {
        return this.allProducts;
      }

      return this.allProducts.filter((products) => {
        return Object.values(products).some((word => String(word).toLowerCase().includes(query)))
      })
    }

  },

  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });

    },

    getDiet() {
      this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn'));

      axios.get(`${endpoint.url}/myDiet/getDiet/${this.dataFromSession.email}`)
          .then((response) => {
            if (response.status === 200) {
              this.diet = response.data;
              this.productsInDay.diet = response.data;
            }
          })
    },

    updateDiet() {
      axios.post(`${endpoint.url}/myDiet/updateDiet`, this.diet)
          .then((response) => {
            if (response.status === 200) {
              this.$swal("", "Pomyślnie zaktualizowano dietę", "success");
            }
          }).catch(() => {
        this.$swal("Ops...", "Popraw wporwadzone dane", "error");
      })
    },

    getAllProducts() {
      axios.post(`${endpoint.url}/products/getAll`)
          .then((response) => {
            if (response.status === 200) {
              this.allProducts = response.data;
              console.log(this.allProducts);
            }
          })
    },

    addProductToDay() {
      axios.post(`${endpoint.url}/products/addToDay`, this.productsInDay)
      .then((response)=>{
        if(response.status === 200){
          console.log(this.productsInDay);
        }
      })
    },


    selectItem(products) {
      this.productsInDay.products = products;
      this.isVisible = false;
    }


  }


}
</script>

<style scoped>

.flexbox-container {
  font-family: lex;
}

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
  padding: 10px 60px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  max-width: 40px;
}

.div-with-inf {
  font-family: lex;
  font-size: 14px;
}

.login-button {
  border: solid 1px black;
  border-radius: 24px;
}

.add-products-container {
  background-color: #FFFFFF;
  min-height: 672px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;

}

.add-products-container .add-products-form-div {
  min-height: 400px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.add-products-container .products-in-day {
  min-height: 400px;
  min-width: 450px;
  display: flex;
}

.custom-select {
  padding: 25px;

}

.custom-select select {
  width: 400px;
  border-radius: 8px;
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: row;
}

.text {
  padding: 10px;
}

.dropdown-wrapper {
  position: relative;
  min-width: 300px;

}

.selected-items {
  height: 40px;
  border: 2px solid lightgrey;
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.dropdown-popover {
  position: absolute;
  border: 2px solid lightgrey;
  top: 46px;
  left: 0;
  right: 0;
  background-color: white;
  max-width: 100%;
  padding: 20px;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
  max-height: 0px;
  overflow: hidden;
}

.dropdown-popover.visible {
  visibility: visible;
  max-height: 250px;
}

.dropdown-popover input {
  width: 90%;
  height: 30px;
  border: 2px solid lightgrey;
  border-radius: 8px;
  padding-left: 5px;

}

.options {
  width: 100%;
}

.options ul {
  list-style: none;
  text-align: left;
  padding-left: 7px;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 14px;
}

.options ul li {
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 5px;
  background-color: #f1f1f1;
  cursor: pointer;
}

.options ul li:hover {
  background-color: #70878a;
  color: #FFFFFF;
}

.drop-down-icon.dropdown {
  transform: rotate(180deg);
  transition: all .2s ease;
}

.drop-down-icon {
  transform: rotate(0deg);
  transition: all .2s ease;
}

.login-button2 {
  border-radius: 8px;
  background-color: black;
  color: white;
  font-family: lex;
  padding: 2px;
  font-size: 10px;
  width: 70px;
  margin-top: 10px;
  cursor: pointer;
  border: 2px solid black;
}

.login-button2:hover {
  background-color: #C1A65F;
}

.login-button {
  padding: 2px;
}

.button{
  padding: 10px;

}
.button .login-button{
  min-width: 100px;
}

</style>

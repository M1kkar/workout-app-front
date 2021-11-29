<template>
  <div class="flexbox-container">
    <my-header></my-header>
    <div class="user-data-content-div">
      <div class="user-data-div">
        <h3>DANE <span style="color: #000000">OSOBOWE</span></h3>
        <div class="name-surname-input-div">
          <input v-model="dataFromSession.name" type="text" class="name-input" />
          <input v-model="dataFromSession.surname" type="text" class="surname-input" />
        </div>
        <div class="name-surname-input-div">
          <input v-on:input="log($event.target.value, $event.target.name)" type="password" class="password-input" placeholder="Hasło"/>
          <input v-model="password1" type="password" class="password-confirm-input" placeholder="Hasło"/>
        </div>
        <div class="change-button-div">
          <a v-on:click="changePassword(dataFromSession.email)"><button class="login-button">Aktualizuj</button></a>
        </div>
      </div>
    </div>

    <div class="body-measurement-content-div">
      <h3>POMIARY <span style="color: #000000">CIAŁA</span></h3>
      <div class="body-measurement-div">
        <div class="measurement-div-img">
          <img src="../images/bodyMeasurement.png"/>
        </div>
        <div class="body-measurement-form-div">
          1 <input v-model="measurementForm.height" type="text" class="name-input" placeholder="Wzrost"/>
          2 <input v-model="measurementForm.biceps" type="text" class="name-input" placeholder="Biceps"/>
          3 <input v-model="measurementForm.chest" type="text" class="name-input" placeholder="Klatka"/>
          4 <input v-model="measurementForm.waist" type="text" class="name-input" placeholder="Talia"/>
          5 <input v-model="measurementForm.hips" type="text" class="name-input" placeholder="Biodra"/>
          6 <input v-model="measurementForm.thigh" type="text" class="name-input" placeholder="Udo"/>
          7 <input v-model="measurementForm.weight" type="text" class="name-input" placeholder="Waga"/>
        </div>

      </div>
      <div class="body-measurement-button-div">
        <a @click="changePassword(dataFromSession.email)"><button class="login-button">Aktualizuj</button></a>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import axios from "axios";
import endpoint from "../endpoint.json";
import Header from "./Header";

export default {
  components: {
    'my-footer': Footer,
    'my-header': Header,
  },
  data() {
    return {
      measurementForm: [],

      userDataForm:{
        name:'',
        surname:'',
        password:''

      },
      password1:'',
      dataFromSession:[],

    }
  },
  mounted() {
    this.getDataToMyProfile();

  },
  methods: {
    getDataToMyProfile(){
      this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn'));
      console.log(this.dataFromSession);

      axios.get(`${endpoint.url}/myProfile/all/?email=${this.dataFromSession.email}`)
      .then((response)=>{
        if(response.status===200){
          console.log("pobrałochybadane");
          this.measurementForm = response.data;
          console.log(this.measurementForm);


        }
      })
    },

    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    changePassword(email){
      axios.put(`${endpoint.url}/myProfile/${email}/${this.userDataForm.password}`)
      .then((response) =>{
        if(response.status===200){
          console.log("pswd change work");
        }
      })
    },
    log(item) {
      this.userDataForm.password = item ;
    }
  }
}
</script>


<style>
.user-data-content-div {
  min-height: 672px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #EBE8E8;
}

.user-data-div {
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
}

.user-data-div h3 {
  font-family: lex;
  color: #C1A65F;
}

.name-surname-input-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-data-div input {
  padding: 8px 30px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px;
  text-align: center;
}

.body-measurement-content-div {
  min-height: 672px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  flex-direction: column;


}
.body-measurement-div{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;

}

.body-measurement-content-div h3 {
  font-family: lex;
  color: #C1A65F;
  margin-bottom: 70px;
}

.body-measurement-div img {
  height: 400px;
}

.body-measurement-form-div {
  max-width: 220px;
  font-family: lex;
  margin-left: 350px;

}

.body-measurement-form-div input {
  padding: 8px 30px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px 30px;
  text-align: center;

}

.body-measurement-button-div{
  margin-top: 40px;
}

</style>

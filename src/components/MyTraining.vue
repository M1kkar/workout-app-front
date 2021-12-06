<template>
  <div class="flexbox-container">
    <my-header></my-header>
    <div class="create-div">
    <div class="div-with-table">
      <h3>Moje <span style="color:#C1A65F">Treningi</span></h3>
      <div class="create-training-div">

        <table class="table">
          <thead>
            <tr>
              <td>Pozycja</td>
              <td>Nazwa Treningu</td>
              <td>Data</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(training,i) in workoutDays" v-bind:key="i">
              <td>{{i+1}}</td>
              <a v-on:click="openDeleteForm"> <td>{{training.trainingName}}</td></a>
              <td>{{training.dateOfTraining}}</td>

            </tr>

          </tbody>
        </table>
      </div>
      <button v-on:click="openForm()" class="register-button">DODAJ TRENING</button>
    </div>
    <div class="my-popup" id="my-form">
      <form class="form-container">
            <h3>Wprowadź dane: </h3>

            <label>Data: </label>
            <input v-model="workoutToSaveForm.dateOfTraining" type="date" required>
            <label>Nazwa: </label>
            <input v-model="workoutToSaveForm.trainingName" type="text" required>
            <button v-on:click="sendForm()" class="register-button">Zapisz</button>
            <button v-on:click="closeForm()" class="register-button">Anuluj</button>
      </form>
    </div>
      <div class="second-popup" id="my-second-form">

        <form class="delete-form">
          <button v-on:click="deleteTraining()" class="register-button">Usun trening</button>
        </form>

      </div>
    <div class="div-with-instruction">
      <div class="instruction">
        <h3>1. Dodaj Swój dzień <span style="color: #C1A65F">Treningowy</span></h3>
        <h3>2. Następnie kliknij w trening i dodaj <span style="color:#C1A65F;">ćwiczenia</span> do swojego dnia</h3>
      </div>
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
import '@sweetalert2/theme-minimal/minimal.css'
import {required} from "vuelidate/lib/validators"
export default {

  mounted() {
    this.getWorkoutDays();
  },

  components:{
    'my-footer': Footer,
    'my-header' : Header,
  },
  data(){
    return {
      dataFromSession:[],

      workoutDays:[],
      workoutToSaveForm:{
        trainingName:'',
        dateOfTraining:'',
      },



    }
  },
  validations: {
    workoutToSaveForm:{
      trainingName:{required},
      dateOfTraining:{required},
    }

  },
  methods:{

    getWorkoutDays(){
      this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn'));

      axios.post(`${endpoint.url}/myTraining/workoutDays`, this.dataFromSession)
        .then((response)=>{
          if(response.status===200){
            this.workoutDays = response.data;
          }
        })

    },

    openForm(){
      document.getElementById("my-form").style.display = "block";
    },
    sendForm(){

      const workoutUserData = {
        userData: this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn')),
        workoutData: this.workoutToSaveForm,
      }

      this.$v.workoutToSaveForm.$touch();
      if(this.$v.workoutToSaveForm.$error){
        console.log("pola");
      }else {
        axios.post(`${endpoint.url}/myTraining/addWorkoutDay`, workoutUserData)
            .then((response) => {
              if (response.status === 200) {
                document.getElementById("my-form").style.display = "none";
              }
            })

      }
    },

    closeForm(){
      document.getElementById("my-form").style.display = "none";
    },

    openDeleteForm(){
      document.getElementById("my-second-form").style.display = "block";
    },

  }

}
</script>

<style scoped>

.create-div{
  display: flex;
  justify-content: space-around;
  min-height: 672px;
  font-family: lex;
  flex-direction: row;
  background-color: #EBE8E8;
}

.div-with-table{
  display: flex;
  flex-direction: column;
  align-self: center;

}


.div-with-table button{
  align-self: center;
  margin-top: 20px;
}


.table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-family: lex;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

}
.create-training-div{
  max-height: 250px;
  overflow-y:auto;
}

.table thead{

}

.table thead tr {
  background-color: #ababab;
  color: #000000;
  text-align: left;
}

.table th,
.table td {
  padding: 15px 25px;
}

.table tbody tr {
  border-bottom: 1px solid #C1A65F;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid black;
}

.table tbody tr.active-row {
  font-weight: bold;
  color: #959896;
}
.div-with-instruction{
  display: flex;
}
.div-with-instruction .instruction {
  align-self: center;
  max-width: 350px;
}



.my-popup{
  display: none;
  position: fixed;
  border: 3px solid #f1f1f1;
  margin-top: 150px;
}
.form-container{
  max-width: 300px;
  padding: 10px;
  background-color: white;
  text-align: center;
}
.form-container input{
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
}

.second-popup{
  display: none;
  position: fixed;
  border: 3px solid #f1f1f1;
  margin-top: 150px;

}

.delete-form{
  max-width: 300px;
  padding: 10px;
  background-color: white;
  text-align: center;
}

</style>

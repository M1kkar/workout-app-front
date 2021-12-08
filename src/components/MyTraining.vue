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
              <td>{{ i + 1 }}</td>
              <td>{{ training.trainingName }}</td>
              <td>{{ training.dateOfTraining }}</td>
            </tr>

            </tbody>
          </table>
        </div>
        <div class="buttons">
          <button v-on:click="openForm()" class="register-button">DODAJ TRENING</button>
          <button v-on:click="openDeleteForm()" class="register-button"> USUŃ TRENING</button>
        </div>
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
          <h3>Wybierz trening: </h3>

          <div class="custom-select">
            <select name="training" v-model="selectedOption">
              <option v-for="(training,i) in workoutDays" v-bind:key="i">
                {{ training.trainingName }}
              </option>
            </select>
          </div>

          <button v-on:click="deleteTraining(selectedOption)" class="register-button">Usuń trening</button>
          <button v-on:click="closeDeleteForm()" class="register-button">Anuluj</button>
        </form>

      </div>
      <div class="div-with-instruction">
        <div class="instruction">
          <h3>1. Dodaj Swój dzień <span style="color: #C1A65F">Treningowy</span></h3>
          <h3>2. Następnie kliknij w trening i dodaj <span style="color:#C1A65F;">ćwiczenia</span> do swojego dnia</h3>
          <h3>3. Nazwy Treningów <span style="color: #cc0000">muszą się różnić</span></h3>
          <h3>3. W celu <span style="color: #cc0000">usunięcia treningu</span> kliknij <span style="color: #C1A65F">"Usuń trening"</span>a
            następnie z listy rozwijalnej wybierz trening</h3>
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

  components: {
    'my-footer': Footer,
    'my-header': Header,
  },
  data() {
    return {
      dataFromSession: [],

      workoutDays: [],
      workoutToSaveForm: {
        trainingName: '',
        dateOfTraining: '',
      },

      selectedOption: '',

      testValue: false,


    }
  },
  validations: {
    workoutToSaveForm: {
      trainingName: {required},
      dateOfTraining: {required},
    }

  },
  methods: {

    getWorkoutDays() {
      this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn'));

      axios.post(`${endpoint.url}/myTraining/workoutDays`, this.dataFromSession)
          .then((response) => {
            if (response.status === 200) {
              this.workoutDays = response.data;
            }
          })

    },

    openForm() {
      var popup = document.getElementById("my-form")
      popup.classList.add('show');
    },
    sendForm() {

      const workoutUserData = {
        userData: this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn')),
        workoutData: this.workoutToSaveForm,
      }

      this.$v.workoutToSaveForm.$touch();
      if (this.$v.workoutToSaveForm.$error) {
        console.log("pola");
      } else {
        axios.post(`${endpoint.url}/myTraining/addWorkoutDay`, workoutUserData)
            .then((response) => {
              if (response.status === 200) {
                console.log("xd");
              }
            }).catch(() => {
          this.$swal('Ops.. Coś poszło nie tak', 'Nazwa treningu musi byc różna', 'error');
        })

      }
    },

    closeForm() {
      var popup = document.getElementById("my-form");
      popup.classList.remove('show');

    },
    deleteTraining(trainingName) {
      this.workoutDays.trainingName = trainingName;

      const full = {
        trainingName,
        user: this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn')),
      }
      axios.post(`${endpoint.url}/myTraining/deleteDay`, full)
          .then((response) => {
            if (response.status === 200) {
              console.log("its works");
            }
          }).catch(() => {
        console.log("pusto");
      })
    },

    openDeleteForm() {
      var popup = document.getElementById("my-second-form");
      popup.classList.add('show');
    },


    closeDeleteForm() {
      /*document.getElementById("my-second-form").style.display = "none";*/
      var popup = document.getElementById("my-second-form");
      popup.classList.remove('show');
    }

  }

}
</script>

<style scoped>

.create-div {
  display: flex;
  justify-content: space-around;
  min-height: 672px;
  font-family: lex;
  flex-direction: row;
  background-color: #EBE8E8;
}

.div-with-table {
  display: flex;
  flex-direction: column;
  align-self: center;

}


.div-with-table button {
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

.create-training-div {
  max-height: 250px;
  overflow-y: auto;
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

.table tbody tr a {
  cursor: pointer;
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

.buttons {
  text-align: center;
}

.buttons .register-button {

}

.div-with-instruction {
  display: flex;
}

.div-with-instruction .instruction {
  align-self: center;
  max-width: 350px;
}

.my-popup {
  visibility: hidden;
  position: fixed;
  border: 3px solid #f1f1f1;
  margin-top: 150px;

  opacity: 0;
  transition: all 0.3s ease-in-out;
  transform: scale(1.3);
}

.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
  text-align: center;
}

.form-container input {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
}

.second-popup {
  visibility: hidden;
  position: fixed;
  border: 3px solid #f1f1f1;
  margin-top: 150px;

  opacity: 0;
  transition: all 0.3s ease-in-out;
  transform: scale(1.3);

}

.delete-form {
  max-width: 300px;
  padding: 10px;
  background-color: white;
  text-align: center;
}

.custom-select{
  padding: 25px;
}
.custom-select select {
  width: 200px;
  font-family: lex;
  padding: 10px;
}

.show{
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

</style>

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
              <a v-on:click="openAddPopup(training.trainingName)">
                <td>{{ training.trainingName }}</td>
              </a>
              <td>{{ training.dateOfTraining }}</td>
            </tr>

            </tbody>
          </table>

        </div>
        <div class="more-inf">
          <h5 v-on:click="changeRoute('/moreDetails')">Więcej szczegółów</h5>
        </div>
        <div class="buttons">
          <div>
            <button v-on:click="openForm()" class="register-button">DODAJ TRENING</button>
          </div>
          <div>
            <button v-on:click="openDeleteForm()" class="register-button"> USUŃ TRENING</button>
          </div>
        </div>
      </div>
      <div class="my-popup" id="my-form">
        <div class="form-container">
          <h3>Wprowadź dane: </h3>

          <label>Data: </label>
          <input v-model="workoutToSaveForm.dateOfTraining" type="date" required>
          <label>Nazwa: </label>
          <input v-model="workoutToSaveForm.trainingName" type="text" required>
          <h6>maxymalna długosc nazwy to 10 znaków</h6>
          <button v-on:click="sendForm()" class="register-button">Zapisz</button>
          <button v-on:click="closeForm()" class="register-button">Anuluj</button>
        </div>
      </div>
      <div class="second-popup" id="my-second-form">

        <div class="delete-form">
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
        </div>

      </div>
      <div class="third-popup" id="my-third-popup">
        <div class="select-popup">
          <h3> Dodaj cwiczenia do treningu </h3>
          <h3><span style="color:white;">{{ this.workoutDays.trainingName }}</span></h3>
          <h3>Wybierz Cwiczenie i wpisz dane</h3>
          <div class="custom-select">
            <select name="exercises" v-model="exerciseName">
              <option v-for="(exercise, i) in allNames" v-bind:key="i">
                {{ exercise }}
              </option>
            </select>
            <div class="ex-inputs">Liczba serii: <input v-model="dataToAddExercise.numberOfSeries" type="text"></div>
            <div class="ex-inputs">Powtórzenia: <input v-model="dataToAddExercise.numberOfRepetitions" type="text">
            </div>
            <div class="ex-inputs">Obciążenie: <input v-model="dataToAddExercise.weight" type="text"></div>
          </div>

          <button v-on:click="addExercise()" class="register-button">Dodaj Cwiczenie</button>
          <button v-on:click="closeAddPopup()" class="register-button">Anuluj</button>

        </div>
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
import {required, maxLength} from "vuelidate/lib/validators"

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
      allNames: [],
      workoutDays: [],
      workoutToSaveForm: {
        trainingName: '',
        dateOfTraining: '',
      },
      selectedOption: '',
      exerciseName: '',

      dataToAddExercise: {
        numberOfSeries: '',
        numberOfRepetitions: '',
        weight: '',
      }

    }
  },
  validations: {
    workoutToSaveForm: {
      trainingName: {required, max: maxLength(10)},
      dateOfTraining: {required},
    },

    dataToAddExercise: {
      numberOfSeries: {required},
      numberOfRepetitions: {required},
      weight: {required},
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
        this.$swal("Ops..", "Wypełnij dane!", "error");
      } else {
        axios.post(`${endpoint.url}/myTraining/addWorkoutDay`, workoutUserData)
            .then((response) => {
              if (response.status === 200) {
                this.closeForm();
                location.reload();
              }
            }).catch(() => {
          this.$swal("Ops..", "Masz już trening o takiej nazwie!", "error");
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
              this.closeDeleteForm();
              location.reload();
            }
          }).catch(() => {
        this.$swal("Ops..", "Musisz wybrać trening!", "error")
      })
    },

    openDeleteForm() {
      var popup = document.getElementById("my-second-form");
      popup.classList.add('show');
    },


    closeDeleteForm() {
      var popup = document.getElementById("my-second-form");
      popup.classList.remove('show');
    },


    getAllExercises(trainingName) {
      this.workoutDays.trainingName = trainingName;
      axios.post(`${endpoint.url}/exercises/all`)
          .then((response) => {
            if (response.status === 200) {
              this.allNames = response.data;
            }
          }).catch(() => {
        this.$swal("Eror", "", "error");
      })
    },

    openAddPopup(trainingName) {
      this.workoutDays.trainingName = trainingName;
      var popup = document.getElementById("my-third-popup")
      popup.classList.add('show');
      this.getAllExercises(trainingName);

    },
    closeAddPopup() {
      var popup = document.getElementById("my-third-popup")
      popup.classList.remove('show');
    },

    //TODO ppoprawić CSS do dodawania ćwiczeń.
    addExercise() {
      this.$v.dataToAddExercise.$touch();
      if (this.$v.dataToAddExercise.$error) {
        this.$swal('Ups..', 'Wypełnij wszystkie dane', 'error')
      } else {
        const full = {
          trainingName: this.workoutDays.trainingName,
          exerciseName: this.exerciseName,
          planOfExercises: this.dataToAddExercise,
          user: this.dataFromSession = JSON.parse(sessionStorage.getItem('loggedIn')),
        }

        axios.post(`${endpoint.url}/planOfExercises/addExercises`, full)
            .then((response) => {
              if (response.status === 200) {
                this.closeAddPopup();
                location.reload();
              }
            }).catch(() => {
          this.$swal("Ops..", "Już dodałeś to ćwiczenie!", "error");
        })

      }

    },
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });

    },

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

.more-inf {
  text-align: center;
}

.more-inf h5 {
  cursor: pointer;
  text-decoration: underline;
  color: #9a8d0f;
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
  display: flex;
  justify-content: space-around;
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
  -webkit-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
}

.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
  text-align: center;
}

.form-container input {
  width: 90%;
  padding: 10px;
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
  -webkit-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
}

.custom-select {
  padding: 25px;
}

.custom-select select {
  width: 200px;
  font-family: lex;
  padding: 10px;
}

.third-popup {
  width: 600px;
  visibility: hidden;
  position: fixed;
  margin-top: 150px;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.2;
  transition: all 0.3s ease-in-out;
  transform: scale(1.3);
  text-align: center;
  -webkit-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 45px 6px rgba(66, 68, 90, 1);
}

.third-popup select {
  width: 430px;
}

.select-popup button {
  margin-bottom: 15px;
}

.select-popup input {
  padding: 4px 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 10px;
}


.show {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

</style>

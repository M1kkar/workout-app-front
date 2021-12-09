<template>
<div class="flexbox-container">
  <my-header></my-header>
    <div class="centre-div">
      <div class="category-menu">
        <nav class="left-side-menu" v-for="(training,i) in workoutDays" v-bind:key="i">
          <a v-on:click="getPlan(training.trainingName)">
            <div class="option">{{training.trainingName}}</div>
          </a>
        </nav>
      </div>
      <div class="exercises-div">
        <div class="exercises">
          <table class="table">
            <thead>
            <tr>
              <th>Pozycja</th>
              <th>Nazwa Ćwiczenia</th>
              <th>Liczba serii</th>
              <th>Liczba powtórzeń</th>
              <th>Obciążenie(kg)</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(exercise, i) in exercises" v-bind:key="i">
              <td>{{i+1}}</td>
              <td>{{exercise.exercises.name}}</td>
              <td>{{exercise.numberOfSeries}}</td>
              <td>{{exercise.numberOfRepetitions}}</td>
              <td>{{exercise.weight}}</td>
              <td><span style="color: darkblue">Usuń</span></td>
            </tr>
            </tbody>
          </table>
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

export default {
  mounted() {
    this.getWorkoutDaysToDetails();
  },

  components: {
    'my-footer': Footer,
    'my-header': Header,
  },
  data(){
    return {
      workoutDays: [],
      dataFromSession: JSON.parse(sessionStorage.getItem('loggedIn')),
      exercises:[],

    }
  },


  methods:{
    getWorkoutDaysToDetails() {


      axios.post(`${endpoint.url}/myTraining/workoutDays`, this.dataFromSession)
          .then((response) => {
            if (response.status === 200) {
              this.workoutDays = response.data;

            }
          })
    },
    getPlan(name){
      var email = this.dataFromSession.email;
      axios.post(`${endpoint.url}/planOfExercises/getPlan?trainingName=${name}&email=${email}`, )
          .then((response)=>{
            if(response.status===200){
              this.exercises = response.data;

            }
          })
    }


  }
}
</script>

<style scoped>

.centre-div{
  min-height: 672px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background: #EBE8E8;
}
.category-menu {
  min-height: 500px;
  max-height: 500px;
  min-width: 250px;
  background: #d3d3d3;
  border-radius: 9px;
  margin-left: 70px;
  flex-direction: column;
  text-align: center;
  overflow-y: auto;

}

.category-menu .option {
  padding: 28px;
  font-family: lex;
  font-size: 12px;
  border-bottom: 1px dotted black;

}

.category-menu .optionL {
  padding: 28px;
  font-family: lex;
  font-size: 12px;
}

.option:hover {
  cursor: pointer;
  color: #C1A65F;
  background: #dddddd;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.optionL:hover {
  cursor: pointer;
  color: #C1A65F;
  background: #dddddd;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}

.exercises-div {
  min-height: 500px;
  min-width: 900px;
  background: #d3d3d3;
  border-radius: 9px;
  align-self: center;
  max-height: 500px;
  overflow-y: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-family: lex;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  max-width: 900px;
}

.table thead tr {
  background-color: #ababab;
  color: #000000;
  text-align: left;
}

.table th,
.table td {
  padding: 15px 25px;
  font-size: 13px;
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
  color: black;
}

</style>

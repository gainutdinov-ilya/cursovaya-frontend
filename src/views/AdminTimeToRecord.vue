<template>
  <preloader ref="preloader"></preloader>
  <div class="display">
    <div v-if="times !== null">
      <h2 class="primary-text size-3">Текущий календарь</h2>
      <div class="calendar">
        <table class="appointment">
          <tr>
            <td></td>
            <td v-for="time in times" :key="time.value">{{ time }}</td>
          </tr>
          <tr v-for="doc in doctors" :key="doc.id">
            <td>{{ doc.name }} {{ doc.surname }} - {{ doc.speciality }}</td>
            <td v-for="ticket in doc.ticketsForDay" :key="ticket.day" class="pointer">{{ ticket.count }}</td>
          </tr>
        </table>
      </div>
    </div>
    <h2 class="primary-text size-3">Генерация талонов</h2>
    <div class="generate size-2">
      <span>В промежутке с </span>
      <input v-model="startDate" class="pointer" type="date">
      <span> по </span>
      <input v-model="endDate" class="pointer" type="date">
      <span> включительно </span><br>
      <span>Рабочий день с </span>
      <input type="time" v-model="startTime">
      <span> по </span>
      <input type="time" v-model="endTime"><br>
      <span>Длительность одного приёма </span>
      <input type="time" v-model="interval">
      <div>
        <label for="all">Для всех врачей</label>
        <input id="all" v-model="this.generateForAllDoctors" checked type="radio" v-bind:value="true"><br>
        <label for="selected">Для выбранных</label>
        <input id="selected" v-model="this.generateForAllDoctors" content="Для Выбранных" type="radio" v-bind:value="false">
      </div>
      <div v-if="generateForAllDoctors == false" class="doctors">
        <div v-for="doc in this.allDoctors" :key="doc.id">
          <input v-model="doc.selected" type="checkbox">
          {{ doc.name }}
          {{ doc.surname }}
          {{ doc.second_name }}
          {{ doc.speciality }}
        </div>
      </div>
      <hr>
      <div>
        <span class="second-text">Пропускать Часы</span><br>
        <label for="yes">Да</label>
        <input id="yes" v-model="this.skipTime" type="radio" v-bind:value="true"><br>
        <label for="no">Нет</label>
        <input id="no" v-model="this.skipTime" checked content="Для Выбранных" type="radio" v-bind:value="false">
      </div>
      <button v-if="this.skipTime == true" class="action pointer" style="margin-bottom: 10px" @click="addException()">
        Добавить исключение
      </button>
      <div v-if="this.skipTime == true" class="times">
        <div v-for="time in timeForSkip" :key="time" class="item">
          <input v-model="time.value" type="time">
          <button class="delete pointer" @click="deleteException(time)">X</button>
        </div>
      </div>
      <hr>
      <button class="action pointer" @click="createAction()">Генерировать</button>
    </div>
    <h2 class="primary-text size-3">Удаление талонов</h2>
    <div class="delete size-2">
      <span>В промежутке с </span>
      <input v-model="startDateDelete" class="pointer" type="date">
      <span> до </span>
      <input v-model="endDateDelete" class="pointer" type="date"><br>
      <button class="pointer" @click="deleteAction()">Удалить</button>
    </div>
  </div>
</template>

<script>
import preloader from "@/components/Preloader";

export default {
  name: "AdminTimeToRecord",
  components: {
    preloader
  },
  data: function () {
    return {
      doctors: {},
      times: null,
      startDate: null,
      startDateDelete: null,
      startTime: null,
      endTime: null,
      endDate: null,
      endDateDelete: null,
      allDoctors: {
        selected: false
      },
      generateForAllDoctors: true,
      skipTime: false,
      timeForSkip: [],
      interval: null
    }
  },
  methods: {
    addException() {
      this.timeForSkip.push({value: "00:00"})
    },
    deleteException(item) {
      this.timeForSkip.pop(item)
    },
    deleteAction() {
      this.$refs.preloader.show()
      if (this.endDateDelete <= this.startDateDelete) {
        alert("Дата старта или удаления некоректна");
        this.$refs.preloader.close()
        return
      } else {
        this.$store.dispatch('deleteCalendar', {
          startDate: this.startDateDelete,
          endDate: this.endDateDelete
        }).then(function () {
          alert("Удалено")
        })
            .catch(function () {
              this.$refs.preloader.close()
              alert("Ошибка, попробуйте ещё раз")
            })
            .finally(() => {
              this.$refs.preloader.close()
              this.$store.dispatch('getCalendar')
                  .then(resolve => {
                    this.doctors = resolve.doctors
                    this.times = resolve.times
                  })
            })
      }
    },
    createAction() {
      let docs = [];
      let times = [];
      if (this.startDate === null) {
        alert("Выберите дату начала промежутка")
        return;
      }
      if (this.endDate === null) {
        alert("Выберите дату конца промежутка")
        return;
      }
      if (new Date(this.startDate) > new Date(this.endDate)) {
        alert("Дата конца промежутка меньше даты начала")
        return;
      }
      if (this.startTime === null) {
        alert("Задайте начало рабочего дня")
        return;
      }
      if (this.endTime === null) {
        alert("Задайте конец рабочего дня")
        return;
      }

      if (Date.parse("1-1-1 ".concat(this.startTime)) >= Date.parse("1-1-1 ".concat(this.endTime))) {
        alert("Время начала рабочего дня больше чем время конца рабочего дня или некоректно")
        return;
      }
      if (this.interval === null) {
        alert("Задайте длительность одного приёма")
        return;
      }
      if (this.generateForAllDoctors === true) {
        this.allDoctors.forEach(item => {
          docs.push(item.id)
        })
      } else {
        this.allDoctors.forEach(item => {
          if (item.selected === true)
            docs.push(item.id)
        })
      }
      if (docs.length === 0) {
        alert("Выберите хотя-бы одного врача или у вас нет врачей?")
        return
      }
      if (this.skipTime === true) {
        this.timeForSkip.forEach(item => {
          if (item.value == "00:00") {
            alert("Провеьте правильность выбора часов для пропуска")
            return
          }
          times.push(item.value)
        })
      }
      if (this.skipTime === true && times.length === 0) {
        alert("Выберите пункт не пропускать часы или добавьте часы для пропуска")
        return;
      }
      this.$refs.preloader.show()
      this.$store.dispatch('createCalendar', {
        "interval": this.interval,
        "startTime": this.startTime,
        "endTime": this.endTime,
        "startDate": this.startDate,
        "endDate": this.endDate,
        "catches": times,
        "doctors": docs,
      }).then(() => {
        this.$refs.preloader.close()
        alert("Талоны успешно сгенерированы")
      }).finally(() => {
        this.$refs.preloader.close()
        this.$store.dispatch('getCalendar')
            .then(resolve => {
              this.doctors = resolve.doctors
              this.times = resolve.times
            })
      })

    }
  },
  mounted() {
    this.$store.dispatch('getCalendar')
        .then(resolve => {
          this.doctors = resolve.doctors
          this.times = resolve.times
        })
    this.$store.dispatch('getAllDoctors')
        .then(resolve => {
          this.allDoctors = resolve
        })
  }
}
</script>

<style scoped>
.calendar {
  overflow: scroll;
  width: 1380px;
  height: 250px;
  margin-top: 30px;
}

.appointment {
  color: var(--second-color);
}

.appointment td, th {
  border: solid 1px var(--another-color);
  padding: 5px;
  font-size: 1.5em;
}

.display {
  overflow-y: scroll;
  padding-bottom: 30px;
}

.generate {
  color: #3A8793;
  margin-top: 30px;
}

input[type=date], button, input[type=time] {
  outline: none;
  color: #3A8793;
  border: #57CCB5 solid 1px;
  font-size: 1em;
  background-color: #81D9C7;
}

.doctors {
  border: #81D9C7 solid 1px;
  width: 750px;
  height: 250px;
  overflow-y: scroll;
}

.times {
  border: #81D9C7 solid 1px;
  width: 220px;
  height: 250px;
  overflow-y: scroll;
}

.times .item {
  margin-top: 5px;
  margin-left: 25px;
  padding: 0px;
  height: 35.3px;
  position: static;
  font-size: 25px !important;
  top: 0px;
}


.times .delete {
  width: 34.25px;
  height: 34.25px;
}

.delete {
  margin-top: 30px;
  color: #3A8793;
}

.delete button {
  margin-top: 10px;
}

</style>

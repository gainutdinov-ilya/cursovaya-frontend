<template >
  <div class="display">
    <h2 class="primary-text size-3">Запись клиента</h2>
    <label v-bind:for="search" class="secondary-text size-2">Поиск по фамилии:</label>
    <input type="text" v-model="search_query" v-bind:id="search" class="styled-input size-2"
           @keydown.enter="query()"><br>
    <button class="default-button-margin size-2" @click="query()">Найти</button>
    <button class="default-button-margin size-2" @click="clear()">Очистить</button>
    <template v-if="search_result !== null">
      <h2 style="margin-top: 10px" class="primary-text size-2">Результаты поиска</h2>
      <div class="search-result">
        <div class="secondary-text result" v-for="user in search_result" :key="user.id">
          <span class="credentials"
                style="font-size: 20px">{{ user.surname }} {{ user.name }} {{ user.second_name }}</span>
          <button class="default-button" @click="select(user.id)">Выбрать</button>
        </div>
      </div>
    </template>
    <template v-if="user_info !== null">
      <h2 style="margin-top: 10px" class="primary-text">Записи клиента</h2>
      <div></div>
      <div class="search-result">
        <div class="secondary-text result" v-for="ticket in user_tickets" :key="ticket.ticket">
          <span
              style="font-size: 20px">{{ ticket.doctor.surname }}. {{
              ticket.doctor.name[0]
            }}. {{ ticket.doctor.second_name[0] }} {{ ticket.calendar }} {{ ticket.ticket }}</span>
          <span v-if="ticket.note.visited"> + </span>
          <button class="default-button" @click="cancel(ticket.note.id)">Отменить</button>
        </div>
      </div>
      <div class="calendar scroll">
        <table v-if="times !== null" class="appointment">
          <tr>
            <td></td>
            <td v-for="time in times" :key="time.value">{{ time }}</td>
          </tr>
          <tr v-for="doc in doctors" :key="doc.id">
            <td>{{ doc.name }} {{ doc.surname }} - {{ doc.speciality }}</td>
            <td v-for="ticket in doc.ticketsForDay" :key="ticket.id">
              <appointment-window v-bind:user-i-d="selected" v-bind:date="ticket.date" v-bind:doc="doc"
                                  v-bind:count="ticket.count" v-bind:data="ticket.tickets"
                                  class="pointer" v-on:updateData="updateData()"></appointment-window>
            </td>
          </tr>
        </table>
        <div v-else class="secondary-text size-2">На данный момент нет свободных талонов</div>
      </div>
    </template>
  </div>
  <preloader ref="preloader"></preloader>
</template>

<script>
import appointmentWindow from "@/components/ModalWindowAppointment";
import preloader from "@/components/Preloader";

export default {
  name: "PersonalAppointment",
  components: {
    appointmentWindow,
    preloader
  }
  ,
  data: function () {
    return {
      search_query: null,
      search_result: null,
      selected: null,
      user_tickets: null,
      user_info: null,
      doctors: null,
      times: null
    }
  },
  methods: {
    cancel(id){
      let confirm = prompt("Отменить запись, ДА НЕТ ?")
      if(confirm.toLowerCase() === 'нет')
        return
      this.$store.dispatch('cancelNote', id)
        .then(()=>{
          this.updateData()
      })
    },
    clear() {
      this.search_query = null
      this.search_result = null
      this.selected = null
      this.user_tickets = null
      this.user_info = null
      this.doctors = null
      this.times = null
    },
    query() {
      this.selected = null
      this.search_result = null
      this.user_tickets = null
      this.user_info = null
      if (this.search_query === null || this.search_query === null) {
        alert("Введите фамилию клиента")
        return
      }
      this.$refs.preloader.show()
      this.$store.dispatch('searchUser', {search: this.search_query})
          .then(data => {
            this.search_result = data
            this.search_query = null
            this.$refs.preloader.close()
          })
          .catch(() => {
            this.$refs.preloader.close()
            alert("Пользователь не найден")
          })
    },
    select(id) {
      this.selected = id
      this.search_result = null
      this.$refs.preloader.show()
      this.$store.dispatch('getUserByID', id)
          .then(resolve => {
            this.user_info = resolve
          })
      this.$store.dispatch('getNotes', {id: id})
          .then(resolve => {
            this.user_tickets = resolve
          })
      this.$store.dispatch('getCalendar')
          .then(resolve => {
            this.doctors = resolve.doctors
            this.times = resolve.times
            this.$refs.preloader.close()
          })
    },
    updateData(){
      this.user_tickets = null
      this.user_info = null
      this.doctors  = null
      this.times = null
      this.$refs.preloader.show()
      this.$store.dispatch('getUserByID', this.selected)
          .then(resolve => {
            this.user_info = resolve
          })
      this.$store.dispatch('getNotes', {id: this.selected})
          .then(resolve => {
            this.user_tickets = resolve
          })
      this.$store.dispatch('getCalendar')
          .then(resolve => {
            this.doctors = resolve.doctors
            this.times = resolve.times
            this.$refs.preloader.close()
          })

    }
  }
}
</script>

<style scoped>
.search-result {
  margin-top: 10px;
  width: 525px;
  height: 500px;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  overflow-y: scroll;
}

.search-result .result {
  position: relative;
  display: inline-block;
  margin-top: 4px;
  margin-left: 4px;
  width: 500px;
  height: 40px;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  vertical-align: center;
  font-size: 30px;
}

.search-result button {
  position: absolute;
  height: 40px;
  right: 0px;
}

.search-result .credentials {
  margin-left: 10px;
}

.calendar {
  position: absolute;
  top: 130px;
  right: 50px;
  width: 800px;
  height: 600px;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.appointment {
  max-width: 500px;
  max-height: 500px;
  color: var(--second-color);

}

.appointment td, th {
  border: solid 1px var(--another-color);
  padding: 5px;
  font-size: 1.5em;

}

</style>

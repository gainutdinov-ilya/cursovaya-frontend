<template>
  <div class="display">
    <h2 class="primary-text size-3">Подтвердить явку</h2>
    <h2 class="secondary-text size-2">Введите номер талона с соблюдением пробелов</h2>
    <label v-bind:for="ticket_number" class="size-2 secondary-text">Номер талона:</label>
    <input v-model="ticket" v-bind:id="ticket_number" class="styled-input secondary-text size-2" type="text"><br>
    <button class="default-button size-2" @click="get()">Найти</button>
    <template v-if="info !== null">
      <h2 class="primary-text size-3">Клиент</h2>
      <h2 class="secondary-text size-2">Фамилия:{{info.surname}}</h2>
      <h2 class="secondary-text size-2">Имя:{{info.name}}</h2>
      <h2 class="secondary-text size-2">Отчество:{{info.second_name}}</h2>
      <h2 class="secondary-text size-2">Время:{{info.time}}</h2>
    </template>
  </div>
</template>

<script>
export default {
  name: "DoctorPage",
  data: function (){
    return {
      ticket: null,
      info: null,
    }
  },
  methods:{
    get(){
      let ticket = this.ticket.split(' ');
      if(ticket.length !== 3){
        alert("Введите номер талона без лишних пробелов")
        return
      }
      this.$store.dispatch('getNote', {client: ticket[0], note: ticket[2], calendar: ticket[1] })
          .then(value => {
            this.info = value
            this.ticket = null;
            alert("Успешно подверждён")
          })
          .catch(() => {
            alert("Неверный номер талона")
          })
    }
  }
}
</script>

<style scoped>

</style>

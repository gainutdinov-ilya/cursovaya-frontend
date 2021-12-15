<template>
  <div class="display">
    <h2 class="primary-text size-3" >Запись на приём</h2>
    <p class="secondary-text size-2">В таблице указано количество свободных талонов у врача на определённый день. Нажмите на число талонов, чтобы выбрать время для записи</p>
    <div class="scroll">
    <table v-if="times !== null" class="appointment">
      <tr>
        <td></td>
        <td v-for="time in times" :key="time.value">{{time}}</td>
      </tr>
      <tr v-for="doc in doctors" :key="doc.id">
        <td>{{doc.name}} {{doc.surname}} - {{doc.speciality}}</td>
        <td v-for="ticket in doc.ticketsForDay" :key="ticket.id">
          <appointment-window v-bind:date="ticket.date" v-bind:doc="doc" v-bind:count="ticket.count" v-bind:data="ticket.tickets" class="pointer"></appointment-window>
        </td>
      </tr>
    </table>

    <div v-else class="secondary-text size-2">На данный момент нет свободных талонов</div>
    </div>
  </div>
  <preloader ref="preloader"></preloader>
</template>

<script>
import appointmentWindow from "@/components/ModalWindowAppointment";
import preloader from "@/components/Preloader";
export default {
  name: 'appointment',
  components:{
    appointmentWindow,
    preloader
  },
  data: function () {
    return {
      doctors: null,
      times: null
    }
  },
  methods:{
    open(data){
      this.$refs.window.open(data)
    }
  },
  mounted() {
    this.$refs.preloader.show()
    this.$store.dispatch('getCalendar')
        .then(resolve =>{
          this.doctors = resolve.doctors
          this.times = resolve.times
          this.$refs.preloader.close()
        })

  }
}
</script>

<style>
.appointment{
  max-width: 1390px;
  max-height: 500px;
  color: var(--second-color);

}

.appointment td,th{
  border: solid 1px var(--another-color);
  padding: 5px;
  font-size: 1.5em;

}
</style>

<template>
  <div v-if="this.data !== null" class="display">
    <img v-bind:src="require('/public/ticketpage.svg')" class="image">
    <h2 class="primary-text size-3">Врач</h2>
    <div class="personal">
      <h2 class="secondary-text size-2">{{ this.data.doctor.surname }}</h2>
      <h2 class="secondary-text size-2">{{ this.data.doctor.name }}</h2>
      <h2 class="secondary-text size-2">{{ this.data.doctor.second_name }}</h2>
    </div>
    <h2 class="primary-text size-3">Дата</h2>
    <div class="personal">
      <h2 class="size-2 secondary-text">
        {{ new Date(data.calendar.dateTime).getDate() }}-{{
          new Date(data.calendar.dateTime).getUTCMonth() + 1
        }}-{{ new Date(data.calendar.dateTime).getFullYear() }}
        {{new Date(data.calendar.dateTime).getUTCHours()}}:<template v-if="new Date(data.calendar.dateTime).getUTCMinutes() <= 9">0{{ new Date(data.calendar.dateTime).getUTCMinutes() }}</template><template v-else>{{ new Date(data.calendar.dateTime).getUTCMinutes() }}</template>
      </h2>
    </div>
    <h2 class="primary-text size-3">Номер талона</h2>
    <h2 class="personal secondary-text size-2">{{data.ticket}}</h2>
    <p class="personal secondary-text size-1">Назовите номер при посещении врача</p>
    <button class="default-button custom-button size-2 pointer" @click="cancelNote()">Отменить запись</button><br>
    <button class="default-button custom-button size-2 pointer " @click="generate()">Версия для печати</button>
  </div>

  <preloader ref="preloader"></preloader>
</template>

<script>
import jsPDF from 'jspdf'
import Roboto from "@/assets/font/Roboto-Regular-normal"
import preloader from "@/components/Preloader"


export default {
  name: "Ticket",
  components: {
    preloader
  },
  props: {
    id: String
  },
  methods:{
    cancelNote(){
      let confirm = prompt("Вы действительно хотите отменить запись? Введите да или нет")
      if(confirm.toLowerCase() === 'да'){
        this.$store.dispatch('cancelNote', this.id)
          .then(() => {
            this.$router.go(-1)
          })
          .catch(()=>{
            alert("Повторите попытку позже")
          })
      }
    },
    generate(){
      let doc = new jsPDF({
        format: 'credit-card',
        orientation: 'l'
      })
      doc.addFileToVFS('Roboto-Regular.ttf', Roboto)
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')
      doc.setFont('Roboto-Regular')
      doc.text('ToothMaster96', 20, 10)
      doc.text('Врач:'.concat(this.data.doctor.surname).concat(" ").concat(this.data.doctor.name).concat(" ").concat(this.data.doctor.second_name), 1, 20)
      doc.text('Специальность: Стоматолог', 1, 30)
      let data =new Date(this.data.calendar.dateTime).getUTCDate().toString()
          .concat("-").concat(new Date(this.data.calendar.dateTime).getUTCMonth()+1)
          .concat("-").concat(new Date(this.data.calendar.dateTime).getUTCFullYear())
          .concat(" ").concat(new Date(this.data.calendar.dateTime).getUTCHours())
          .concat(":").concat(new Date(this.data.calendar.dateTime).getUTCMinutes() <= 9 ? "0".concat(new Date(this.data.calendar.dateTime).getUTCMinutes()) :new Date(this.data.calendar.dateTime).getUTCMinutes() )
      doc.text('Дата: '.concat(data), 1, 40)
      doc.text('Номер талона: '.concat(this.data.ticket), 1, 50)
      doc.save('talon.pdf')
    }
  },
  data: function () {
    return {
      data: null
    }
  },
  mounted() {
    this.$refs.preloader.show()
    this.$store.dispatch('getNote', {id: this.id})
        .then(value => {
          this.data = value
          this.$refs.preloader.close()
        })
        .catch(() => {
          //this.$router.go(-1)
        })
  }
}
</script>

<style scoped>
.personal {
  margin-left: 10px;
}

.image {
  position: absolute;
  right: 100px;
  top: 50px
}

.custom-button{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

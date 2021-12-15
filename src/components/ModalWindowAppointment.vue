<template>
  <div class="pointer" @click="open()">
    {{ this.count }}
  </div>
  <div class="appointmentWindow" v-if="show">
    <h2 class="primary-text size-2">Запись на приём</h2>
    <div v-on:click="close()" class="close pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
      </svg>
    </div>
    <div class="tickets">
      <table>
        <tr v-for="date in formatedData" :key="date.id">
          <div class="element">
            <svg class="clocks" version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="25px" height="30px" viewBox="0 0 1280.000000 1280.000000"
                 preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                 fill="#57CCB5FF" stroke="none">
                <path d="M6095 12794 c-1613 -86 -3089 -740 -4219 -1870 -1072 -1072 -1705
-2428 -1853 -3969 -24 -252 -24 -858 0 -1110 148 -1541 781 -2897 1853 -3969
1072 -1072 2428 -1705 3969 -1853 252 -24 858 -24 1110 0 1541 148 2897 781
3969 1853 1072 1072 1705 2428 1853 3969 24 252 24 858 0 1110 -148 1541 -781
2897 -1853 3969 -1069 1068 -2440 1710 -3959 1851 -162 15 -716 27 -870 19z
m805 -763 c411 -43 728 -102 1072 -202 1363 -393 2541 -1301 3276 -2524 529
-881 802 -1871 802 -2905 0 -1034 -273 -2024 -802 -2905 -838 -1396 -2248
-2372 -3835 -2655 -381 -68 -586 -85 -1013 -85 -427 0 -632 17 -1013 85 -1707
304 -3196 1405 -4005 2960 -566 1086 -759 2335 -551 3558 274 1618 1250 3041
2668 3892 735 441 1570 711 2416 780 72 5 148 12 170 14 79 8 712 -3 815 -13z"/>
                <path d="M7975 11463 c-99 -13 -220 -66 -296 -130 -108 -90 -156 -174 -224
-383 -25 -80 -82 -253 -125 -385 -43 -132 -146 -449 -230 -705 -83 -256 -155
-474 -160 -485 -6 -12 -8 131 -7 375 2 357 0 401 -16 460 -38 133 -130 260
-242 334 -166 111 -387 127 -570 42 -157 -73 -285 -234 -320 -403 -11 -55 -16
-381 -25 -1738 l-10 -1669 -24 -37 c-145 -219 -188 -496 -115 -744 50 -167
175 -351 316 -464 86 -69 245 -152 338 -176 528 -137 1067 239 1136 793 20
160 -13 347 -88 495 -13 26 -22 51 -19 55 5 8 78 233 396 1207 127 391 267
819 311 953 43 133 115 351 158 485 497 1520 471 1434 471 1538 0 96 -16 161
-62 259 -106 220 -352 355 -593 323z"/>
              </g>
            </svg>
            {{ date.dateTime.getUTCHours() }}:
            <template v-if="date.dateTime.getUTCMinutes() <= 9">0{{ date.dateTime.getUTCMinutes() }}</template>
            <template v-else>{{ date.dateTime.getUTCMinutes() }}</template>
            <input v-bind:name="date.id" type="radio" v-model="time" v-bind:value="date.id">
          </div>
        </tr>
      </table>
    </div>
    <div class="doctor">
      <h2 class="primary-text size-2">Врач</h2>
      <div class="credentials">
        <h2>{{ doc.surname }}</h2>
        <h2>{{ doc.name }}</h2>
        <h2>{{ doc.second_name }}</h2>
      </div>
      <h2 class="primary-text size-2">Дата</h2>
      <h2 style="margin-left: 10px">{{ date }}</h2>
      <button style="margin-top: 10px" class="default-button size-1 pointer" @click="create()">Записаться</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "appointmentWindow",
  props: {
    data: Object,
    count: Number,
    doc: Object,
    date: Object
  },
  data: function () {
    return {
      show: false,
      formatedData: null,
      time: null
    }
  },
  methods: {
    open() {
      this.format()
      this.show = true
    },
    close() {
      this.show = false
    },
    format() {
      let formatedData = []
      this.data.forEach(item => {
        formatedData.push({
          id: item.id,
          dateTime: new Date(item.dateTime)
        })
      })
      this.formatedData = formatedData
    },
    create() {
      if(this.time === null){
        alert("Выберите время для записи")
        return;
      }
      this.$store.dispatch('createNote', {
        'id': this.time
      })
          .then(() => {
            alert("Вы успешно записаны, получить талон можно на главной странице")
            return
          })
          .catch(() => {
            alert("Похоже вы уже записаны, проверьте уведомления на главной странице")
            return
          })
    }
  }
}
</script>

<style scoped>
.appointmentWindow {
  position: absolute;
  z-index: 9999;
  width: 770px;
  height: 570px;
  left: calc(50% - 800px / 2);
  top: calc(50% - 600px / 2);
  background: white;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding-top: 30px;
  padding-left: 30px;
  display: inline-block;
}

.close {
  border: none;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 30px;
  top: 40px;
  color: transparent;
  z-index: 19999;
}

table {
  border-collapse: collapse;
}

tr {
  border: 1px solid #57CCB5;
}

.element {
  padding: 5px;
  text-align: center;
}

.tickets {
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  width: 150px;
  height: 470px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}

.clocks {
  float: left;
  color: var(--main-color);
}

input[type=radio] {
  background: white;
  content: "";
  float: right;
}

.doctor {
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  width: 500px;
  height: 470px;
  float: right;
  position: absolute;
  top: 90px;
  right: 30px;
  padding: 10px;

}

.doctor .credentials {
  margin-left: 10px;
}
</style>

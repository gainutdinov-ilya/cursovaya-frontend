<template>
  <h2 class="primary-text size-3" >Запись на приём</h2>
  <p class="secondary-text size-2">В таблице указано количество свободных талонов у врача на определённый день. Нажмите на число талонов, чтобы выбрать время для записи</p>
  <table class="appointment">
    <tr>
      <td></td>
      <td v-for="time in times" :key="time.value">{{time.value}}</td>
    </tr>
    <tr v-for="doc in doctors" :key="doc.name">
      <td>{{doc.name}} - {{doc.specialization}}</td>
      <td class="pointer" v-for="ticket in doc.tickets" :key="ticket.left">{{ticket.left}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'appointment',
  data: function () {
    return {
      times: [
        {
          value: '1.01.01'
        },
        {
          value: '2.01.01'
        }
      ],
      doctors: [
        {
          id: 1,
          name: 'Иванов Иван Иванович',
          specialization: 'Стоматолог',
          tickets: [
            {
              id: 1,
              left: 1
            },
            {
              id: 2,
              left: 2
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
.appointment{
  margin-left: 10px;
  color: var(--second-color);
}

.appointment td,th{
  border: solid 1px var(--another-color);
  padding: 5px;
  font-size: 1.5em;
}

.container h2, .container p {
  margin: 10px;
}
</style>

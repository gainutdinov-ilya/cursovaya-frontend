<template>
  <ModalWindow ref="modal"></ModalWindow>
  <div class="landing">
    <h2 id="role" class="role"></h2>
    <h3 id="surname" class="personal"></h3>
    <h3 id="name" class="personal"></h3>
    <h3 id="second_name" class="personal"></h3>
    <h2>Стоматология</h2>
    <div class="text">
      <li>Без очередей</li>
      <li>И звонков</li>
      <li>Всё очень просто!</li>
    </div>
    <button type="button" @click="open()">Запишись онлайн</button>
  </div>
  <img :src="require('@/assets/landing.jpg')" alt="" class="landing-image" v-bind:height='520' v-bind:width='520'>

</template>

<script>
import ModalWindow from '@/components/ModalWindowHome'

export default {
  name: 'IndexPage',
  components: {
    ModalWindow
  },
  props: {
    login: Boolean
  },
  methods: {
    open: function () {
      this.$refs.modal.show = true
    }
  }
}
</script>

<style>
.landing {
  position: absolute;
  width: 640px;
  height: 420px;
  left: 420px;
  top: 280px;
}

.landing h2 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  margin: 0;
  line-height: 75px;
  color: var(--main-color);
}

.landing .text {
  margin-top: 50px;
  height: 160px;
}

.landing .personal {
  color: var(--second-color);
  font-family: Roboto;
  font-size: 48px;
  font-weight: 500;
  margin: 1px;
}

.landing .text li {
  list-style: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 56px;
  color: var(--second-color);
}

.landing button {
  border: none;
  background: var(--another-color);
  color: var(--second-color);
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  padding: 10px;

  position: absolute;
  bottom: 0;
}

.landing button:focus {
  border: none;
}

.landing-image {
  position: absolute;
  left: 1010px;
  top: 255px;
}

</style>

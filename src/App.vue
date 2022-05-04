<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Humanizing Technologies Test Task </q-toolbar-title>
        <q-btn v-if="isAuth" flat round dense icon="logout" @click="logOut" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isAuth = computed(() => store.getters["getAuth"]);
function logOut(): void {
  store.dispatch("logout");
}
</script>

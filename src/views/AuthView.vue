<template>
  <q-page class="row justify-center items-center">
    <div class="row">
      <div class="column">
        <q-card square bordered>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input outlined v-model.trim="login" label="Login">
                <template v-slot:before>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                outlined
                v-model.trim="password"
                type="password"
                label="password"
              >
                <template v-slot:before>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions align="around" class="row">
            <div class="col-6 q-px-sm">
              <q-btn
                label="Login"
                class="full-width"
                @click="loginUser({ login, password })"
              />
            </div>
            <div class="col-6 q-px-sm">
              <q-btn
                label="Register"
                class="full-width"
                @click="registrationUser({ login, password })"
              />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const login = ref<string | null>(null);
const password = ref<string | null>(null);

function loginUser(formData: object): void {
  store.dispatch("login", formData);
}

function registrationUser(formData: object): void {
  store.dispatch("registration", formData);
}
</script>

<style scoped></style>

<script setup>
import { useRouter } from "vue-router";

import { reactive, ref } from "vue";
// import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
// import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
// const isPasswordVisible = ref(false);
const loading = ref(false);

const userCredentials = reactive({
  username: "",
  password: "",
});

const login = async () => {
  userCredentials.username = userCredentials.username.trim();
  userCredentials.password = userCredentials.password.trim();

  try {
    loading.value = true;
    await userStore.login(userCredentials);
    await router.push("/dashboard");
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="userCredentials.username"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="userCredentials.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <!-- 
        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <!-- <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>

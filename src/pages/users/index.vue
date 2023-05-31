<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mdiTableBorder, mdiTableOff } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import user_list from "./user_list";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();
userStore.getAllUsers();
const body = computed(() => userStore.users);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
      </SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable :header="user_list" :body="body" />
      </CardBox>
      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />
    </SectionMain>
  </LayoutAuthenticated>
</template>

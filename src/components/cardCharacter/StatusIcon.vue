<template>
  <span class="status">
    <span class="status__icon"></span>
    {{ status }} - {{ species }}
  </span>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { Status } from "../../interfaces/ICharacter";

const props = defineProps<{
  status: Status;
  species: string;
}>();

const color: ComputedRef<string> = computed(() => {
  let value: string = "";
  if (props.status === "Alive") {
    value = "#55cc44";
  } else if (props.status === "Dead") {
    value = "#d63d2e";
  } else if (props.status === "unknown") {
    value = "#9e9e9e";
  }
  return value;
});
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 500;

  &__icon {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: v-bind("color");
  }
}
</style>

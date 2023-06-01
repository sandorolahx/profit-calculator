<template>
  <div class="toggle-cmp">
    <label class="name">{{ props.label }}</label>
    <label class="container">
      <input
        type="checkbox"
        :checked="props.checked"
        :disabled="props.disabled"
        @change="onChange"
      />
      <span class="switch"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Props } from "@/types/ToggleComponentTypes";

const emit = defineEmits<{
  (e: "update:checked", value: boolean): void;
  (e: "onChanged", value: boolean): void;
}>();

const props = defineProps<Props>();

const onChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.checked;
  emit("update:checked", value);
  emit("onChanged", value);
};
</script>

<script lang="ts">
export default {};
</script>


<style scoped>
.toggle-cmp {
  display: inline-block;
}

.container {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 40px;
}

input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.switch {
  --switch-container-width: 40px;
  --switch-size: calc(var(--switch-container-width) / 2);
  --active-color: #000;
  --disabled-color: #efefef;

  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  border-radius: var(--switch-size);
  background-color: var(--disabled-color);
  flex-shrink: 0;
  transition: background-color 0.25s ease-in-out;
}
.switch::before {
  content: "";
  position: absolute;
  left: 1px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  border-radius: 9999px;
  background-color: white;
  border: 2px solid var(--disabled-color);
  transition: transform 0.375s ease-in-out;
}
input:checked + .switch {
  background-color: var(--active-color);
}
input:checked + .switch::before {
  border-color: var(--active-color);
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}
input:focus + .switch::before {
  border-color: var(--disabled-color);
}
input:focus:checked + .switch::before {
  border-color: var(--active-color);
}
input:disabled + .switch {
  background-color: var(--disabled-color);
}
input:disabled + .switch::before {
  background-color: var(--disabled-color);
  border-color: var(--disabled-color);
}

.name {
  display: block;
  margin-bottom: 5px;
}
</style>

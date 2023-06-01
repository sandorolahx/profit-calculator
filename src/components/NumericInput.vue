<template>
  <div>
    <label class="name">{{ props.label }}</label>
    <br />
    <input
      type="number"
      :disabled="props.disabled"
      :value="props.modelValue"
      @input="onInput"
      v-if="editing"
      @blur="toggleEditing"
      ref="editor"
    />

    <input
      type="text"
      :disabled="props.disabled"
      :value="readableValue"
      @input="onInput"
      v-if="!editing"
      @focus="toggleEditing"
    />
  </div>
</template>
  
<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import { Props } from '@/types/NumericInputTypes';

const emit = defineEmits<{
  (e: "update:modelValue", value: Number | null): void;
}>();

const props = defineProps<Props>();

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value.trim();

  let number = Number(value);
  if (props.min !== undefined && number < props.min) {
    number = props.min;
  }
  if (props.max !== undefined && number > props.max) {
    number = props.max;
  }

  emit("update:modelValue", value ? number : null);
  if (value) {
    inputElement.value = String(number);
  }
};

const editor = ref<HTMLInputElement>();
let editing = ref(false);
const toggleEditing = () => {
  editing.value = !editing.value;

  if (editing.value) {
    setTimeout(() => editor.value?.focus(), 100);
  }
};
const readableValue = computed(() => {
  let result = String(props.modelValue ?? "");
  if (props.symbol && result) {
    result += props.symbol;
  }

  return result;
});
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
input {
  width: 100%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.name {
  display: inline-block;
  margin-bottom: 5px;
}
</style>

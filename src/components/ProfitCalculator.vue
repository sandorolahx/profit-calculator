<template>
  <div class="container">
    <div class="section price-section">
      <div class="content-wrapper">
        <div class="row">
          <div class="item">
            <NumericInput
              id="price"
              v-model="store.price"
              :min="0"
              :symbol="CONFIG.CurrencySymbol"
              label="Price"
            />
          </div>
          <div class="item">
            <NumericInput
              id="cost"
              v-model="store.cost"
              :min="0"
              :symbol="CONFIG.CurrencySymbol"
              label="Cost"
            />
          </div>
        </div>
        <div class="row">
          <div class="item">
            <NumericInput
              id="discount"
              :disabled="!store.enableDiscount"
              v-model="store.discount"
              :min="0"
              :max="100"
              symbol="%"
              label="Discount"
            />
          </div>
          <div class="item">
            <ToggleComponent
            id="discountToggle"
              v-model:checked="store.enableDiscount"
              label="Enable discount"
              @onChanged="
                (value) =>
                  store.discountToggled(value, CONFIG.ClearDiscountIfDisabled)
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="section profit-section">
      <div class="profit-wrapper">
        <div>Profit</div>
        <div class="profit-value">
          {{ store.profit }}
          <span v-if="store.profit || store.profit === 0">{{
            CONFIG.CurrencySymbol
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProfitCalculatorStore } from  '../stores/ProfitCalculatorStore';
import NumericInput from "./NumericInput.vue";
import ToggleComponent from "./ToggleComponent.vue";
import { CONFIG } from "../config";

export default defineComponent({
  name: "ProfitCalculator",
  setup() {
    const store = useProfitCalculatorStore();

    return {
      store,
      CONFIG,
    };
  },
  components: {
    NumericInput,
    ToggleComponent,
  },
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 10px;
  max-width: 1120px;
  width: 100%;
  margin: 30px auto;
}

.section {
  background: #fff;
}

.price-section {
  flex: 2;
}

.profit-section {
  flex: 1;
}

.content-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.row {
  display: flex;
  width: 100%;
  gap: 30px;
}

.item {
  flex: 1;
}

.profit-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.profit-value {
  font-size: 26px;
  font-weight: bold;
  min-height: 30px;
  margin-top: 15px;
}

/* @media (max-width: 768px) {
.row {
flex-direction: column;  
}
.container{
  flex-direction: column-reverse
}
} */
</style>

<template>
  <div class="product-variants-grid">
    <ProductVariantItem
      v-for="variant in variants"
      :key="variant.id"
      :variant="variant"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ProductVariantItem from './ProductVariantItem.vue';

export default {
  components: {
    ProductVariantItem,
  },
  setup() {
    const variants = ref([]);

    onMounted(async () => {
      const response = await axios.get('http://34.145.105.9/api/product-variants?page=1');
      const fetchedVariants = response.data['hydra:member'];  // Rename to avoid shadowing
      const variantsDetailsPromises = fetchedVariants.map(async (variant) => {
        const variantByIdResponse = await axios.get(`http://34.145.105.9/api/product-variants/${variant.id}`);
        return { ...variant, code: variantByIdResponse.data.code };
      });
      variants.value = await Promise.all(variantsDetailsPromises);
    });

    return { variants };
  },
};
</script>

<style>
.product-variants-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 items per row */
  gap: 20px; /* Spacing between items */
  padding: 20px; /* Outer spacing */
}
</style>
<style>
/* Admin Dashboard Styling */
.admin-dashboard {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.admin-dashboard h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.toggle-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #0056b3;
}

.toggle-button:last-child {
  margin-right: 0;
}

/* Add spacing between toggle buttons and content sections */
.content-section {
  margin-top: 1rem;
}
</style>
<template>
  <div class="p-6">
    <div v-if="isAdmin" class="space-y-8">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>

      <div>
        <button @click="showCategories = !showCategories" class="toggle-button">Toggle Categories</button>
        <button @click="showProducts = !showProducts" class="toggle-button">Toggle Products</button>
        <button @click="showProductVariants = !showProductVariants" class="toggle-button">Toggle Product Variants</button>
      </div>

      <!-- Section for Categories -->
      <section v-if="showCategories">
        <!-- Form for creating a Category -->
        <section>
          <h2 class="text-xl font-bold mb-4">Create Category</h2>
          <form @submit.prevent="createCategory" class="mb-6">
            <div class="mb-4">
              <input v-model="newCategory.code" placeholder="Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
            </div>
            <div class="flex items-center mb-4">
              <input type="checkbox" v-model="newCategory.enabled" class="mr-2" /> Enabled
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </form>
        </section>

        <!-- List Categories -->
        <section>
          <h2 class="text-xl font-bold mb-4">List of Categories</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="category in categories" :key="category.id" class="bg-white p-4 shadow-sm rounded">
              <div><strong>Category code:</strong> {{ category.code }}</div>
              <div><strong>Enabled:</strong> {{ category.enabled }}</div>
              <div class="flex mt-2 justify-end">
                <button @click="editCategoryStart(category)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                <button @click="deleteCategory(category.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- Section for Products -->
      <section v-if="showProducts">
        <!-- Form for creating a Product -->
        <section>
          <h2 class="text-xl font-bold mb-4">Create Product</h2>
          <form @submit.prevent="createProduct" class="mb-6">
            <div class="mb-4">
              <input v-model="newProduct.code" placeholder="Product Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
            </div>
            <div class="mb-4">
              <label>Category:</label>
              <select v-model="newProduct.category" class="shadow border rounded py-2 px-3">
                <option v-for="category in categories" :value="`/api/categories/${category.id}`" :key="category.id">
                  {{ category.code }}
                </option>
              </select>
            </div>
            <div class="flex items-center mb-4">
              <input type="checkbox" v-model="newProduct.enabled" class="mr-2" /> Enabled
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </form>
        </section>

        <!-- List Products -->
        <section>
          <h2 class="text-xl font-bold mb-4">List of Products</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="product in products" :key="product.id" class="bg-white p-4 shadow-sm rounded">
              <div><strong>Product code:</strong> {{ product.code }}</div>
              <div><strong>Category code:</strong> {{ getCategoryCode(product.category) }}</div>
              <div><strong>Enabled:</strong> {{ product.enabled }}</div>
              <div class="flex mt-2">
                <button @click="editProductStart(product)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                <button @click="deleteProduct(product.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- Section for Product Variants -->
      <section v-if="showProductVariants">
        <!-- Form for creating a Product Variant -->
        <section>
          <h2 class="text-xl font-bold mb-4">Create Product Variant</h2>
          <form @submit.prevent="createProductVariant" class="mb-6">
            <div class="mb-4">
              <input v-model="newProductVariant.code" placeholder="Variant Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
            </div>
            <div class="mb-4">
              <input v-model="newProductVariant.imagePath" placeholder="Image Path" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
            </div>
            <div class="mb-4">
              <input type="number" v-model.number="newProductVariant.price" placeholder="Price" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
            </div>
            <div class="mb-4">
              <label>Product:</label>
              <select v-model="newProductVariant.product" class="shadow border rounded py-2 px-3">
                <option v-for="product in products" :value="`/api/products/${product.id}`" :key="product.id">
                  {{ product.code }}
                </option>
              </select>
            </div>
            <div class="flex items-center mb-4">
              <input type="checkbox" v-model="newProductVariant.enabled" class="mr-2" /> Enabled
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Variant
            </button>
          </form>
        </section>

        <!-- List Product Variants -->
        <section>
          <h2 class="text-xl font-bold mb-4">List of Product Variants</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="variant in productVariants" :key="variant.id" class="bg-white p-4 shadow-sm rounded">
              <div><strong>Variant Code:</strong> {{ variant.code }}</div>
              <div><strong>Price:</strong> {{ variant.price }}</div>
              <div><strong>Product:</strong> {{ getProductCode(variant.product) }}</div>
              <div><strong>Enabled:</strong> {{ variant.enabled }}</div>
              <div class="flex mt-2 justify-end">
                <button @click="editProductVariantStart(variant)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                <button @click="deleteProductVariant(variant.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>

    <!-- ... -->
    <div v-else>
      <h1 class="text-2xl font-bold">User Dashboard</h1>
    <h1 class="text-2xl font-bold">User Dashboard</h1>
    <p>Welcome to the user dashboard!</p>
    <!-- User-specific content -->
    <!-- ... -->
    </div>
    <!-- Edit Category Modal -->
    <div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl font-bold mb-4">Edit Category</h2>
        <form @submit.prevent="editCategorySubmit">
          <div class="mb-4">
            <input v-model="editCategoryData.code" placeholder="Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
          </div>
          <div class="flex items-center mb-4">
            <input type="checkbox" v-model="editCategoryData.enabled" class="mr-2" /> Enabled
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Edit Product Modal -->
    <div v-if="isEditingProduct" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl font-bold mb-4">Edit Product</h2>
        <form @submit.prevent="editProductSubmit">
          <div class="mb-4">
            <input v-model="editProductData.code" placeholder="Product Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
          </div>
          <div class="mb-4">
            <label>Category:</label>
            <select v-model="editProductData.category" class="shadow border rounded py-2 px-3">
              <option v-for="category in categories" :value="`/api/categories/${category.id}`" :key="category.id">
                {{ category.code }}
              </option>
            </select>
          </div>
          <div class="flex items-center mb-4">
            <input type="checkbox" v-model="editProductData.enabled" class="mr-2" /> Enabled
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditProductModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Product Variant Modal -->
    <div v-if="isEditingProductVariant" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl font-bold mb-4">Edit Product Variant</h2>
        <form @submit.prevent="editProductVariantSubmit">
          <div class="mb-4">
            <input v-model="editProductVariantData.code" placeholder="Variant Code" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
          </div>
          <div class="mb-4">
            <input v-model="editProductVariantData.imagePath" placeholder="Image Path" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
          </div>
          <div class="mb-4">
            <input type="number" v-model.number="editProductVariantData.price" placeholder="Price" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
          </div>
          <div class="mb-4">
            <label>Product:</label>
            <select v-model="editProductVariantData.product" class="shadow border rounded py-2 px-3">
              <option v-for="product in products" :value="`/api/products/${product.id}`" :key="product.id">
                {{ product.code }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <input type="checkbox" v-model="editProductVariantData.enabled" class="mr-2" /> Enabled
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditProductVariantModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';


const router = useRouter();
const userRoles = ref([]);
const categories = ref([]);
const newCategory = ref({ code: '', enabled: false });
const editCategoryData = ref(null);
const isEditing = ref(false);
const products = ref([]);
const newProduct = ref({ category: '', code: '', enabled: false });
const isEditingProduct = ref(false);
const editProductData = ref({});
const productVariants = ref([]);
const newProductVariant = ref({
  code: '',
  imagePath: '',
  price: 0,
  product: '', // This should be a product URL, e.g., '/api/products/1'
  enabled: false
});
const isEditingProductVariant = ref(false);
const editProductVariantData = ref({});

const showCategories = ref(false);
const showProducts = ref(false);
const showProductVariants = ref(false);

// Function to retrieve the auth token
const getAuthToken = () => localStorage.getItem('access_token');

// Create an Axios instance with the Authorization header
const authAxios = axios.create({
  baseURL: 'http://34.145.105.9/api/',
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

const categoriesMap = computed(() => {
  const map = {};
  categories.value.forEach((category) => {
    map[category['@id']] = category.code; // Map the category URL to its code
  });
  return map;
});

function getCategoryCode(categoryUrl) {
  // Use the categories map to find the category code by URL
  return categoriesMap.value[categoryUrl] || 'Unknown';
}

onMounted(async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRoles.value = decoded.roles;
      if (isAdmin.value) {
        await fetchCategories();
        await fetchProducts();
        await fetchProductVariants();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      router.push({ name: 'login' });
    }
  }
});

const isAdmin = computed(() => userRoles.value.includes('ROLE_ADMIN'));

async function fetchCategories() {
  try {
    const response = await authAxios.get('categories');
    categories.value = response.data['hydra:member']; // Access the hydra:member property
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function createCategory() {
  try {
    await axios.post('http://34.145.105.9/api/categories', newCategory.value);
    await fetchCategories(); // Refresh list after creating
    newCategory.value = { code: '', enabled: false }; // Reset form
  } catch (error) {
    console.error('Error creating category:', error);
  }
}

async function deleteCategory(id) {
  try {
    await axios.delete(`http://34.145.105.9/api/categories/${id}`);
    await fetchCategories(); // Refresh list after deleting
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}

function editCategoryStart(category) {
  editCategoryData.value = { ...category };
  isEditing.value = true; // Open the modal
}

function closeEditProductVariantModal() {
  isEditingProductVariant.value = false;
  editProductVariantData.value = {}; // Clear the edit form
}

async function editCategorySubmit() {
  try {
    // Ensure that the ID is correctly referenced
    const categoryId = editCategoryData.value.id;
    if (!categoryId) {
      console.log('Category ID is undefined');
    }
    const payload = {
      code: editCategoryData.value.code,
      enabled: editCategoryData.value.enabled,
    };
    await authAxios.put(`categories/${categoryId}`, payload);
    await fetchCategories(); // Refresh the list after updating
    isEditing.value = false; // Close the modal
    editCategoryData.value = null; // Clear the edit form
  } catch (error) {
    console.error('Error updating category:', error);
  }
}

function closeEditModal() {
  isEditing.value = false;
  editCategoryData.value = null; // Clear the edit form
}

async function fetchProducts() {
  try {
    const response = await authAxios.get('products');
    products.value = response.data['hydra:member']; // Access the hydra:member property for products
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function createProduct() {
  try {
    const payload = {
      category: newProduct.value.category,
      code: newProduct.value.code,
      enabled: newProduct.value.enabled
    };
    await authAxios.post('products', payload);
    await fetchProducts(); // Refresh list after creating
    newProduct.value = { category: '', code: '', enabled: false }; // Reset form
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

async function fetchProductVariants() {
  try {
    const response = await authAxios.get('product-variants');
    productVariants.value = response.data['hydra:member'];
    console.log("Fetched product variants:", productVariants.value); // Debugging
  } catch (error) {
    console.error('Error fetching product variants:', error);
  }
}

// Create a new product variant
async function createProductVariant() {
  try {
    await authAxios.post('product-variants', newProductVariant.value);
    await fetchProductVariants(); // Refresh list after creating
    newProductVariant.value = { code: '', imagePath: '', price: 0, product: '', enabled: false }; // Reset form
  } catch (error) {
    console.error('Error creating product variant:', error);
  }
}

function editProductStart(product) {
  editProductData.value = { ...product, category: `/api/categories/${product.category.id}` };
  isEditingProduct.value = true; // Open the product edit modal
}

async function editProductSubmit() {
  try {
    const productId = editProductData.value.id;
    if (!productId) {
      console.log('Product ID is undefined');
      return;
    }
    const payload = {
      code: editProductData.value.code,
      enabled: editProductData.value.enabled,
      // Make sure you extract the category ID from the URL if needed
      category: editProductData.value.category
    };
    await authAxios.put(`products/${productId}`, payload);
    await fetchProducts(); // Refresh the list after updating
    isEditingProduct.value = false; // Close the modal
    editProductData.value = {}; // Clear the edit form
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

function closeEditProductModal() {
  isEditingProduct.value = false;
  editProductData.value = {}; // Clear the edit form
}

async function deleteProduct(id) {
  try {
    await authAxios.delete(`products/${id}`);
    await fetchProducts(); // Refresh the list after deleting
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Fetch product codes for display
function getProductCode(productUrl) {
  // Assumes productUrl is like '/api/products/1'
  const productId = productUrl.split('/').pop();
  const product = products.value.find(p => p.id.toString() === productId);
  return product ? product.code : 'Unknown';
}

// Start editing a product variant
function editProductVariantStart(variant) {
  editProductVariantData.value = { ...variant };
  isEditingProductVariant.value = true; // Open the modal
}

// Submit edits for a product variant
async function editProductVariantSubmit() {
  try {
    const variantId = editProductVariantData.value.id;
    await authAxios.put(`product-variants/${variantId}`, editProductVariantData.value);
    await fetchProductVariants(); // Refresh list after updating
    isEditingProductVariant.value = false; // Close the modal
    editProductVariantData.value = {}; // Clear the edit form
  } catch (error) {
    console.error('Error updating product variant:', error);
  }
}

// Delete a product variant
async function deleteProductVariant(id) {
  try {
    await authAxios.delete(`product-variants/${id}`);
    await fetchProductVariants(); // Refresh list after deleting
  } catch (error) {
    console.error('Error deleting product variant:', error);
  }
}
</script>


import { defineStore } from "pinia";
import ProductsAPI from "@/api/products";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      Products: [],
      Categories: [],
    };
  },
  getters:{
    getProducts: (state) => {
        return state.Products;
      },
      getCategories: (state) => {
        return state.Categories;
      },
  },
  actions:{
    async fetchProducts(category:any=null){
     
    
    console.log("fetching products")
      const response = await ProductsAPI.getProducts(category);
      console.log(response);
      this.Products = response;
    },
    async fetchCategories(){
      const response = await ProductsAPI.getCategories();
      this.Categories = response;
    }
  }
});
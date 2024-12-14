import { defineStore } from "pinia";
import ProductsAPI from "@/api/products";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      Products: [],
      Categories: [],
      FrontContent: [],
      SelectedCategory: null as any,
      CategoryDetail: [] as any
    };
  },
  getters:{
    getProducts: (state) => {
        return state.Products;
      },
      getCategories: (state) => {
        return state.Categories;
        },
      getFrontContent: (state) => {
        return state.FrontContent;
      },
      getSelectedCategory: (state) => {
        return state.SelectedCategory;
        },
      getCategoryDetail: (state) => {
        return state.CategoryDetail;
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
    },
    async fetchFrontContent(){
      const response = await ProductsAPI.getFrontContent();
      this.FrontContent = response;
    },
    async fetchCategoryDetail(categoryId:any){
      const response = await ProductsAPI.getCategoryDetail(categoryId);
      this.CategoryDetail = response;
    }
  }
});

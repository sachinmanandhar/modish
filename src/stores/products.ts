import { defineStore } from "pinia";
import ProductsAPI from "@/api/products";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      Products: [],
      ProductsList: [] as any,
      CurrentPage: null,
      NextPage: null,
      Categories: [],
      FrontContent: [],
      SelectedCategory: null as any,
      CategoryDetail: [] as any,
      TopProducts: [] as any,
    };
  },
  getters: {
    getTopProducts: (state) => {
      return state.TopProducts;
    },
    getProducts: (state) => {
      return state.ProductsList;
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
  actions: {
    async fetchProducts(category: any = null) {
      console.log("fetching products");
      const response: any = await ProductsAPI.getProducts(category);
      console.log(response);
      if (response) {
        if (response.results) {
          this.ProductsList.push(...response.results);
          this.CurrentPage = response.current_page;
          this.NextPage = response.next;
        }
      }
      this.Products = response;
    },
    async fetchReplaceProducts(category: any = null) {
      console.log("fetching products");
      const response: any = await ProductsAPI.getProducts(category);
      console.log(response);
      if (response) {
        if (response.results) {
          this.ProductsList = response.results;
          this.CurrentPage = response.current_page;
          this.NextPage = response.next;
        }
      }
      this.Products = response;
    },
    async fetchCategories() {
      const response = await ProductsAPI.getCategories();
      this.Categories = response;
    },
    async fetchFrontContent() {
      const response = await ProductsAPI.getFrontContent();
      this.FrontContent = response;
    },
    async fetchCategoryDetail(categoryId: any) {
      const response = await ProductsAPI.getCategoryDetail(categoryId);
      this.CategoryDetail = response;
    },
    async fetchTopProduct() {
      const response = await ProductsAPI.fetchTopProduct();
      this.TopProducts = response;
    },
  },
});

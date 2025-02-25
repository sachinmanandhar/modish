import { getAPI, postAPI } from "@/api";
import { Action } from "@/api/actions";

export default new (class ProductsAPI {
  public async getProducts(category: any = null) {
    const params = category ? `?category=${category}` : "";
    const response = await getAPI(Action.Products, params);
    return response;
  }
  public async retrieveSingleProduct(productId: any) {
    // const params  = category ? `?category=${category}` : ''
    const response = await getAPI(`${Action.Products}/${productId}`);
    return response;
  }
  public async getCategories() {
    const response = await getAPI(Action.Categories);
    return response;
  }
  public async getWomensWear() {
    const response = await getAPI(Action.WomensWear);
    return response;
  }
  public async postOrders(data: any) {
    const new_data = {
      status: "pending",
      ...data,
    };
    const response = await postAPI(Action.Orders, new_data);
    return response;
  }
  public async getFrontContent() {
    const response = await getAPI(Action.FrontContent);
    return response;
  }
  public async getCategoryDetail(categoryId: any) {
    const params = categoryId ? `?category=${categoryId}` : "";
    const response = await getAPI(Action.CategoryDetail, params);
    return response;
  }
  public async fetchTopProduct() {
    const response = await getAPI(Action.TopProducts);
    return response;
  }
})();

import { getAPI,postAPI } from "@/api";
import { Action } from "@/api/actions";

export default new (class ProductsAPI {
  public async getProducts(category:any=null) {
     const params  = category ? `?category=${category}` : ''
    const response = await getAPI(Action.Products,params);
    return response;
  }
  public async getCategories() {
    const response = await getAPI(Action.Categories);
    return response;
  }
  public async postOrders(data:any) {
    const new_data = {
      status: 'pending',
      ...data
    }
    const response = await postAPI(Action.Orders,new_data);
    return response;
  }
})();

import { getAPI, postAPI } from "@/api";
import { Action } from "@/api/actions";

export default new (class GENERALAPI {
  public async postBulkOrder(data: any) {
    const response = await postAPI(Action.BulkOrder, data);
    return response;
  }
  public async fetchFAQs(id: any = null) {
    var params = "";
    if (id) {
      params = id;
    }
    const response = await getAPI(Action.FAQs, params);
    return response;
  }
})();

import { getAPI, postAPI } from "@/api";
import { Action } from "@/api/actions";

export default new (class BLOGAPI {
  public async fetchBlogDetail(slug: any) {
    const response = await getAPI(`${Action.Blogs}/${slug}`);
    return response;
  }
  public async fetchBlogs(parms: any = null) {
    const response = await getAPI(`${Action.Blogs}`);
    return response;
  }
})();

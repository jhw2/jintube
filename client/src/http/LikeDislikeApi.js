import http from "./http-common-like";
class LikeDislikeApi {
  getLikes(params) { 
    return http.post(`/getLikes`, params);
  }
  getDisLikes(params) { 
    return http.post(`/getDisLikes`, params);
  }
  onLiked(params) { 
    return http.post(`/onLiked`, params);
  }
  unLiked(params) { 
    return http.post(`/unLiked`, params);
  }
  onDisLiked(params) { 
    return http.post(`/onDisLiked`, params);
  }
  unDisLiked(params) { 
    return http.post(`/unDisLiked`, params);
  }
}
export default new LikeDislikeApi();
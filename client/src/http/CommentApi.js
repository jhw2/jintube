import http from "./http-common-comment";
class CommentApi {
  saveComment(params) { 
    return http.post(`/saveComment`, params);
  }
  getComment(postId) { 
    return http.post(`/getComment`, postId);
  }

}
export default new CommentApi();
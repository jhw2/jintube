import http from "./http-common-subscribe";
class SubscribeApi {
  getSubscribeCount(userToId) { 
    return http.post(`/getSubscribeCount`, userToId);
  }
  getSubscribed(usersId) { 
    return http.post(`/getSubscribed`, usersId);
  }
  unSubscribed(usersId) { 
    return http.post(`/unSubscribed`, usersId);
  }
  onSubscribed(usersId) { 
    return http.post(`/onSubscribed`, usersId);
  }
}
export default new SubscribeApi();
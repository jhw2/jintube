import http from "./http-common-video";
class FileUpload {
  uploadFile(formData) { 
    const config= {header: {"Content-type": "multipart/form-data"}}
    return http.post(`/uploadfiles`, formData, config);
  }
  getThumbnail(params) { 
    return http.post(`/thumbnail`, params);
  }
  uploadVideo(params) {
    return http.post('/uploadVideo', params);
  }
  getVideos(type) {
    return http.get(`/getVideos/${type}`);
  }
  getVideoDetail(videoId) {
    return http.post('/getVideoDetail', videoId);
  }
  updateViews(videoId) {
    return http.post('/updateViews', videoId);
  }
}
export default new FileUpload();
import http from "./http-common";
class FileUpload {
  uploadFile(formData) { 
    const config= {header: {"Content-type": "multipart/form-data"}}
    return http.post(`/uploadfiles`, formData, config);
  }
  getThumbnail(params) { 
    return http.post(`/thumbnail`, params);
  }
}
export default new FileUpload();
  
import axios from "axios";
import { SERVER_URL } from '../components/Config.js';

export default axios.create({
  baseURL: SERVER_URL+"api/comment",
}); 
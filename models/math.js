import { FileHttp } from '../utils/upload.js'
import { HTTP } from "../utils/http.js";

class fileUpload extends FileHttp{
  inferImage(url,imagePath,Status){
    return this.request({
        url:url,
        name:'input'
        ,imagePath:imagePath
        ,status:Status
    }
    )
  }
}
class httpGet extends HTTP{
    getModeStuts(){
        return this.request({
            url:'modeStatus'
        })
    }
    getPannelStatus(){
        return this.request({
            url:'pannelOpen'
        })
    }
}

export { fileUpload,httpGet }
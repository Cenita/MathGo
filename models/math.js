import { FileHttp } from '../utils/upload.js'

class fileUpload extends FileHttp{
  inferImage(imagePath){
    return this.request({
        url:'infer',
        name:'input'
        ,imagePath:imagePath}
    )
  }
}

export { fileUpload }
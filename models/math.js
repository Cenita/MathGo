import { HTTP } from '../utils/http.js'
class MathModel extends HTTP {
  getTest() {
    return this.request({
      url: 'awe',
        method:'GET'
    })
  }

  // search(start, q) {
  //   return this.request({
  //     url: 'book/search?summary=1',
  //     data: {
  //       q: q,
  //       start: start
  //     }
  //   })
  // }

  // getMyBookCount() {
  //   return this.request({
  //     url: '/book/favor/count'
  //   })
  // }

  // getDetail(bid) {
  //   return this.request({
  //     url: `book/${bid}/detail`
  //   })
  // }

  // getLikeStatus(bid) {
  //   return this.request({
  //     url: `book/${bid}/favor`
  //   })
  // }

  // getComments(bid) {
  //   return this.request({
  //     url: `book/${bid}/short_comment`
  //   })
  // }

  // postComment(bid, comment) {
  //   return this.request({
  //     url: 'book/add/short_comment',
  //     method: 'POST',
  //     data: {
  //       book_id: bid,
  //       content: comment
  //     }
  //   })
  // }


}

export { MathModel }
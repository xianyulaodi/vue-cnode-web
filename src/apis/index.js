import axios from 'axios'

const basiUrl = 'https://cnodejs.org/api/v1'

export const getTopics = (params, succCall, failCall) => {
  axios.get(basiUrl + `/topics?page=${params.page}&limit=20&tab=${params.tab}`)
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

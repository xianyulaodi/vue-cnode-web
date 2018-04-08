import axios from 'axios'

const basiUrl = 'https://cnodejs.org/api/v1'

export const getTopics = (params, succCall, failCall) => {
  axios.get(basiUrl + `/topics?page=${params.page}&limit=${params.limit}&tab=${params.tab}`)
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

export const getDetail = (params, succCall, failCall) => {
  axios.get(basiUrl + `/topic/${params.id}`)
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

export const login = (params, succCall, failCall) => {
  axios.post(basiUrl + '/accesstoken', {
    accesstoken: params.accesstoken
  })
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

export const userInfo = (params, succCall, failCall) => {
  axios.get(basiUrl + `/user/${params.name}`)
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

export const reply = (params, topicId, succCall, failCall) => {
  axios.post(basiUrl + `/topic/${topicId}/replies`, params)
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

// 为评论点赞
export const upReply = (params, succCall, failCall) => {
  axios.post(basiUrl + `/reply/${params.replyId}/ups`, {
    accesstoken: params.accesstoken
  })
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
}

export const messageCount = (params, succCall, failCall) => {
  axios.get(basiUrl + '/message/count', {
    params: {
      accesstoken: params.accesstoken
    }
  })
    .then(function (res) {
      succCall(res)
    })
    .catch(function (err) {
      failCall(err)
    })
} 
import request from '@/utils/request'

export function setReturns(ret) {
  return request({
    url: '/returns',
    method: 'post',
    data: ret
  })
}

export function getReturnsByName(name) {
  return request({
    url: `/returns/name/${name}`,
    method: 'get'
  })
}

export function getReturnsById(id) {
  return request({
    url: `/returns/id/${id}`,
    method: 'get'
  })
}

import request from '@/utils/request'

export function setReturns(ret) {
  return request({
    url: '/returns',
    method: 'post',
    data: ret
  })
}

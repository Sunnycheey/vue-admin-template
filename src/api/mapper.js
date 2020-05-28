import request from '@/utils/request'

export function setMapper(data) {
  return request({
    url: 'mappers',
    method: 'post',
    data
  })
}

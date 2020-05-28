import request from '@/utils/request'

export function getItem(id) {
  return request({
    url: `/item/${id}`,
    method: 'get'
  })
}

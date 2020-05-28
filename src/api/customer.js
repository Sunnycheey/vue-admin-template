import request from '@/utils/request'

export function getCustomers() {
  return request({
    url: '/customers',
    method: 'get',
  })
}
export function setCustomers(customer) {
  return request({
    url: '/customers',
    method: 'post',
    data: customer
  })
}

export function getCustomersByName(name) {
  return request({
    url: `/customers/name/${name}`,
    method: 'get'
  })
}

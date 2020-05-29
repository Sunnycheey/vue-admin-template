import request from '@/utils/request'

export function setFile(rawFile) {
  let formData = new FormData();
  formData.append('file', rawFile)
  return request({
    url: '/items',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

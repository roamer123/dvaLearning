import request from '../utils/request';
export function fetch({
  page = 1
}) {
  return request(`/book/books?_page=${page}`, {
    method: 'GET',
    mode: 'cors',
  });
}

export function remove(id) {

  return request(`/book/books?idLoanBook=${id}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include'
  });
}

export function patch(id, values) {
  return request(`/book/books`, {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request(`/book/books/`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
    },
    body: JSON.stringify(values),
  })
}
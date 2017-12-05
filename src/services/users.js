import request from '../utils/request';

export function fetch({
	page = 1
}) {
	return request(`/users?_page=${page}&_limit=5`, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include'
	});
}

export function remove(id) {

	return request(`/users/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'include'
	});
}

export function patch(id, values) {
	return request(`/users/${id}`, {
		method: 'PATCH',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify(values),
	});
}

export function create(values) {
	return request(`/users/`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify(values),
	})
}
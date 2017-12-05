import * as booksService from '../services/books';

export default {
	namespace: 'books',
	state: {
		list: [],
		total: null,
		page: null
	},
	reducers: {
		save(state, {
			payload: {
				data: list,
				total,
				page
			}
		}) {
			return {...state,
				list,
				total,
				page
			};
		},
	},
	effects: { * fetch({
			payload: page
		}, {
			call,
			put
		}) {
			const {
				data,
				headers
			} = yield call(booksService.fetch, page);

			yield put({
				type: 'save',
				payload: {
					data,
					total: parseInt(data.booksListData.length, 10),
					page: parseInt(page.page, 10)
				}
			});
		},
		* remove({
			payload: id
		}, {
			call,
			put,
		}) {
			yield call(booksService.remove, id);
			yield put({
				type: 'reload'
			});
		},
		* patch({
			payload: {
				id,
				values
			}
		}, {
			call,
			put
		}) {
			yield call(booksService.patch, id, values);
			yield put({
				type: 'reload'
			});
		},
		* create({
			payload: values
		}, {
			call,
			put
		}) {
			yield call(booksService.create, values);
			yield put({
				type: 'reload'
			});
		},
		* reload(action, {
			put,
			select
		}) {
			const page = yield select(state => state.books.page);
			yield put({
				type: 'fetch',
				payload: {
					page
				}
			});
		},
	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {

			return history.listen(({
				pathname,
				query
			}) => {

				if (pathname === '/books') {
					dispatch({
						type: 'fetch',
						payload: {
							page: query.page
						}
					});
				}
			});
		}
	},
};
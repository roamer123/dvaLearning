const qs = require('qs');
const mockjs = require('mockjs');

const Random = mockjs.Random;

let tableListData = {};

if (!global.tableListData) {
	const data = mockjs.mock({
		'data|10': [{
			'id|+1': 1,
			'name': () => {
				return Random.cname();
			},
			'email': () => {
				return Random.email();
			},
			'website': () => {
				return 'www.baid.com';
			}
		}],
		page: {
			total: 10,
			current: 1,
		},
	});
	tableListData = data;
	global.tableListData = tableListData;
} else {
	tableListData = global.tableListData;
}

module.exports = {
	'GET /users' (req, res) {
		const page = qs.parse(req.query);
		const pageSize = pageSize || 3;
		const currentPage = page._page || 1;

		let data;
		let newPage;

		let newData = tableListData.data.concat();

		if (page.field) {
			const d = newData.filter((item) => {
				return item[page.filed].indexOf(page.keyword) > -1;
			});

			data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

			newPage = {
				current: currentPage * 1,
				total: d.length,
			};
		} else {
			data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
			tableListData.page.current = currentPage * 1;

			newPage = {
				current: tableListData.page.current,
				total: tableListData.page.total,
			}
		}

		setTimeout(() => {
			res.setHeader('x-total-count', 10);
			res.json(data);
		}, 200);
	},
	'DELETE /users/:id' (req, res) {
		const id = parseInt(req.params.id, 10);
		tableListData.data = tableListData.data.filter(function(item, index) {
			return item.id === id ? false : true;
		});

		setTimeout(() => {
			res.json({
				id: id
			});
		}, 200);
	},
	'PATCH /users/:id' (req, res) {
		const id = parseInt(req.params.id, 10);


		tableListData.data.forEach(function(item, index) {
			if (item.id == id) {
				tableListData.data.splice(index, 1, {
					id: id,
					name: req.body.name,
					email: req.body.email,
					website: req.body.website
				});
				return true;
			}

		});


		setTimeout(() => {
			res.json({
				id: id
			});
		}, 200);
	},
	'POST /users' (req, res) {
		const id = tableListData.page.total + 1;
		ableListData.page.total = ableListData.page.total + 1;

		tableListData.data.push({
			id: id,
			name: req.body.name,
			email: req.body.email,
			website: req.body.website
		});

		setTimeout(() => {
			res.json({
				id: id
			});
		}, 200);
	},


}
tableListData.data
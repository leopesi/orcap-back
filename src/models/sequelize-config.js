module.exports = {
	models: {
		sessions: ['session', 'user', 'logist', 'seller', 'client'],
		permissions: ['permission-group', 'permission'],
		basics: ['provider', 'brand', 'format', 'payment', 'status_budget', 'type_budget'],
		equipments: ['equipment', 'blanket', 'engine', 'filter', 'lid', 'profile', 'vinyl'],
		budgets: ['budget', 'budget_equipment', 'budget_manpower', 'budget_material'],
	},
}

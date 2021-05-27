module.exports = {
  models: {
    permissions: ["permission-group", "permission"],
    sessions: ["session", "user", "logist", "seller", "client"],
    basics: [
      "provider",
      "brand",
      "format",
      "payment",
      "status_budget",
      "type_budget",
    ],
    equipments: [
      "equipment",
      "engine",
	  "lid",
      "filter",
      "blanket",
      "profile",
      "vinyl",
    ],
    budgets: [
      "budget",
      "budget_equipment",
      "budget_manpower",
      "budget_material",
    ],
  },
};

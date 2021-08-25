module.exports = {
  models: {
    permissions: ["permission-group", "permission"],
    sessions: ["session", "user", "logist", "seller", "client"],
    basics: [
      "provider",
      "brand",
      "format",
    ],
    equipments: [
      "equipment",
      "engine",
	  "lid",
      "filter",
      "blanket",
      "profile",
      "vinyl",
      "material"
    ],
    budgets: [
      "budget",
      "budget_equipment",
      "budget_material",
    ],
    
  },
};

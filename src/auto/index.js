const AutoLid = require('./lid')
const Lid = require('../models/equipments/lid')

const AutoSand = require('./sand')
const Sand = require('../models/equipments/sand')

const AutoEngine = require('./engine')
const Engine = require('../models/equipments/engine')

const AutoFilter = require('./filters')
const Filter = require('../models/equipments/filter')

const AutoVinyl = require('./vinyl')
const Vinyl = require('../models/equipments/vinyl')

const AutoBlanket = require('./blanket')
const Blanket = require('../models/equipments/blanket')

const Equipment = require('../models/equipments/equipment')

module.exports = {
	engines: [],
	lids: [],
	sands: [],

	async start(logist_id, callback) {
		await this.insertLid(logist_id)
		await this.insertSand(logist_id)
		await this.insertEngine(logist_id)
		await this.insertFilter(logist_id)
		await this.insertVinyl(logist_id)
		await this.insertBlanket(logist_id)
		callback('OK')
	},

	async insertLid(logist_id) {
		for (const i in AutoLid.data) {
			const data = {
				logist_id,
				name: AutoLid.data[i][0],
				active: true,
			}

			const result = await this.insertEquipment(data)
			if (result && result.dataValues && result.dataValues.id) {
				const dataLid = {
					equipment_id: result.dataValues.id,
					active: true,
				}
				await Lid.build(dataLid)
					.save()
					.then((data) => {
						data.dataValues.name = result.dataValues.name
						data.dataValues.equipment_id = result.dataValues.id
						this.lids.push(data.dataValues)
					})
					.catch((error) => {})
			}
		}
	},

	async insertSand(logist_id) {
		for (const i in AutoSand.data) {
			const data = {
				logist_id,
				brand_id: AutoSand.data[i][0],
				name: AutoSand.data[i][2],
				active: true,
			}

			const result = await this.insertEquipment(data)
				if (result && result.dataValues && result.dataValues.id) {
					const dataSand = {
						equipment_id: result.dataValues.id,
						sand_kg: AutoSand.data[i][3],
						active: true,
					}
					await Sand.build(dataSand)
						.save()
						.then((data) => {
                            data.dataValues.name = result.dataValues.name
						    data.dataValues.equipment_id = result.dataValues.id
                            data.dataValues.brand_id = result.dataValues.brand_id
                            this.sands.push(data.dataValues)
                        })
						.catch((error) => {})
				}
		}
	},

	async insertEngine(logist_id) {
		for (const i in AutoEngine.data) {
			const data = {
				logist_id,
				brand_id: AutoEngine.data[i][0],
				name: AutoEngine.data[i][1],
				active: true,
			}

			const result = await this.insertEquipment(data)
				if (result && result.dataValues && result.dataValues.id) {
					const dataEngine = {
						equipment_id: result.dataValues.id,
						sand_kg: AutoEngine.data[i][3],
						active: true,
					}
					await Engine.build(dataEngine)
						.save()
						.then((data) => {
                            data.dataValues.name = result.dataValues.name
						    data.dataValues.equipment_id = result.dataValues.id
                            this.engines.push(data.dataValues)
                        })
						.catch((error) => {})
				}
		}
	},

	async insertFilter(logist_id) {
		for (const i in AutoFilter.data) {
			const data = {
				logist_id,
				brand_id: AutoFilter.data[i][1],
				name: AutoFilter.data[i][0],
				active: true,
			}

			const result = await this.insertEquipment(data)
				if (result && result.dataValues && result.dataValues.id) {
					const dataFilter = {
						equipment_id: result.dataValues.id,
						sand_kg: AutoFilter.data[i][5],
						max_capacity: AutoFilter.data[i][2],
						active: true,
					}
					for (const j in this.lids) {
						const lid = this.lids[j]
						if (lid && lid.name && lid.name.toString().trim() == AutoFilter.data[i][4].toString().trim()) {
							dataFilter.lid_id = lid.id
						}
					}
                    for (const j in this.engines) {
						const engine = this.engines[j]
						if (engine && engine.name && engine.name.toString().indexOf(AutoFilter.data[i][3].toString().trim()) !== -1) {
							dataFilter.engine_id = engine.id
						}
					}
					dataFilter.sand_id = null
                    for (const j in this.sands) {
						const sand = this.sands[j]
						if (sand && sand.brand_id && sand.brand_id.toString().trim() == AutoFilter.data[i][1].toString().trim()) {
							dataFilter.sand_id = sand.id
						}
					}
					if (!dataFilter.sand_id) {
						dataFilter.sand_id = this.sands[0].id
					}
					await Filter.build(dataFilter)
						.save()
						.then((data) => {})
						.catch((error) => {})
				}
		}
	},

	async insertVinyl(logist_id) {
		for (const i in AutoVinyl.data) {
			const data = {
				logist_id,
				brand_id: AutoVinyl.data[i][0],
				name: AutoVinyl.data[i][2],
				active: true,
			}

			const result = await this.insertEquipment(data)
				if (result && result.dataValues && result.dataValues.id) {
					const dataVinyl = {
						equipment_id: result.dataValues.id,
						sand_kg: AutoVinyl.data[i][3],
						active: true,
					}
					await Vinyl.build(dataVinyl)
						.save()
						.then((data) => {})
						.catch((error) => {})
				}
		}
	},

	async insertBlanket(logist_id) {
		for (const i in AutoBlanket.data) {
			const data = {
				logist_id,
				name: AutoBlanket.data[i][0],
				active: true,
			}

			const result = await this.insertEquipment(data)
				if (result && result.dataValues && result.dataValues.id) {
					const dataBlanket = {
						equipment_id: result.dataValues.id,
						sand_kg: AutoBlanket.data[i][3],
						active: true,
					}
					await Blanket.build(dataBlanket)
						.save()
						.then((data) => {})
						.catch((error) => {})
				}
		}
	},

	async insertEquipment(data) {
        let result = null
		await Equipment.build(data)
			.save()
			.then((data) => {
				result = data
			})
			.catch((error) => {
				result = false
			})
        return result
	},
}

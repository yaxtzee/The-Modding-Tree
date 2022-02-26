"use strict";
addLayer("a", {
	name: "acceleration",
	resource: "accelerators",
	symbol: "A",
	position: 0,
	row: 0,
	layerShown: () => player.p.upgrades.includes(15),
	color: "#c81a33",

	startData: () => ({
		unlocked: true,
		points: new Decimal(0),
	}),

	requires: new Decimal(500),
	baseResource: "points",
	baseAmount: () => player.points,

	type: "custom",
	getResetGain: () => player.points.lt(2500) ? new Decimal(0) :
		player.points.div(2500).log(3).times(Math.log(1.004)).lambertw().div(Math.log(1.004)).plus(1)
		.minus(player.a.points).floor().max(0),
	canReset: () => tmp.a.getResetGain.gte(1),
	getNextAt: () => // cost = 3^(x*1.004^x)
		Decimal.pow(3, player.a.points.plus(tmp.a.getResetGain)
			.times(Decimal.pow(1.004, player.a.points.plus(tmp.a.getResetGain)))
		).times(2500),
	prestigeButtonText: () => 
		`Reset for ${format(tmp.a.resetGain)} accelerators. Next at ${format(tmp.a.getNextAt)}.`,

	tabFormat: [
		["display-text", () => `You have ${format(player.a.points)} accelerators.<br/>
			Each one acts like an additional level of Speed (&times;${format(tmp.a.baseEffect)} points).<br/>
			However, the multiplier to points also divides prestige point gain.<br/>
			The total effect is &times;${format(effectOf(layers.a.effect, "points"))} point gain,
			and an equal prestige point divisor.`],
		"blank",
		"prestige-button",
		"blank",
		"blank",
		"upgrades",
	],

	effect: registerUpgrade({
		alwaysApply: true,
		effects: {
			"points": ["multiply", () => Decimal.pow(tmp.a.baseEffect, player.a.best)],
			"prestige points": ["divide", () => Decimal.pow(tmp.a.baseEffect, player.a.best)],
		},
	}),

	upgrades: {
		11: {
			title: "endgame",
			description: "you are at endgame. price subject to change.",
			cost: new Decimal(40), // 40 + 1e6 pp req in update?
		}
	},

	baseEffect: () => effectOf(layers.p.upgrades[13], "points"),
});
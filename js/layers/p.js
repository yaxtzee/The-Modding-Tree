"use strict";
addLayer("p", {
	name: "prestige",
	resource: "prestige points",
	symbol: "P",
	position: 1,
	row: 1,
	layerShown: () => true,
	color: "#4bdc13",
	branches: ["a"],

	startData: () => ({
		unlocked: true,
		points: new Decimal(0),
		resets: new Decimal(0),

		bestPoints: new Decimal(0),
	}),

	requires: new Decimal(10),
	baseResource: "points",
	baseAmount: () => player.points,

	type: "custom",
	getResetGain: () => player.points.div(10).pow(0.5)
		.times(totalUpgradeEffect("prestige points"))
		.minus(player.p.points).floor().max(0),
	canReset: () => player.points.gte(10),
	getNextAt: () => player.p.points.plus(1)
		.div(totalUpgradeEffect("prestige points"))
		.pow(2).times(10),
	prestigeButtonText: () => 
		`Reset for ${format(tmp.p.resetGain)} prestige points. You will start gaining prestige points at ${format(tmp.p.getNextAt)}.`,
	onPrestige: () => player.p.resets = player.p.resets.plus(1),

	tabFormat: [
		["display-text", () => `You have ${format(player.p.points)} prestige points.<br/>
			Current prestige points subtract from your gain until 0.<br/>
			You have done ${formatWhole(player.p.resets)} prestige resets.`],
		"blank",
		"prestige-button",
		"blank",
		"upgrades",
	],

	upgrades: {
		11: registerUpgrade(modifyUpgrade({
			title: "Experience",
			description: "Gain a multiplier to point gain based on prestige resets, capping at x10.",
			effects: { "points": ["multiply", () => player.p.resets.sqrt().plus(1).min(10)] },
			cost: new Decimal(1),
		}, "points")),
		12: registerUpgrade(modifyUpgrade({
			title: "Knowledge",
			description: "Prestige points boost point gain.",
			effects: { "points": ["multiply", () => player.p.points.plus(1).sqrt()] },
			cost: new Decimal(2),
			unlocked: () => player.p.upgrades.includes(11),
		}, "points")),
		13: registerUpgrade(modifyUpgrade({
			title: "Speed",
			description: "Double point gain.",
			effects: { "points": ["multiply", () => 2] },
			cost: new Decimal(3),
			unlocked: () => player.p.upgrades.includes(12),
		}, "points")),
		14: registerUpgrade(modifyUpgrade({
			title: "Reflection",
			description: "Best points across all prestiges boosts point gain.",
			effects: { "points": ["multiply", () => player.p.bestPoints.pow(1 / 3).div(6).plus(1)] },
			cost: new Decimal(5),
			unlocked: () => player.p.upgrades.includes(13),
		}, "points")),
		15: {
			title: "Acceleration",
			description: "Unlock a new layer.",
			cost: new Decimal(25),
			unlocked: () => player.p.upgrades.includes(14),
		},
	},

	update() {
		player.p.bestPoints = player.p.bestPoints.max(player.points);
	},
});
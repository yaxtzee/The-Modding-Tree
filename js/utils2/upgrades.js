"use strict";
const upgradeEffects = {};

const formatters = {
	multiply: x => `&times;${format(x)}`,
};

function modifyUpgrade(upgrade) {
	const displayPerTag = [];

	for (const tag in upgrade.effects) {
		const [op, calc] = upgrade.effects[tag];
		const formatter = upgrade.effects[tag][2] ?? formatters[op];

		displayPerTag.push([formatter, calc, tag]);
	}

	upgrade.effectDisplay = () => displayPerTag.map(([formatter, calc, tag]) => `${formatter(calc())} ${tag}`).join(", ");

	return upgrade;
}

function registerUpgrade(upgrade) {
	for (const tag in upgrade.effects) {
		const [op, calc] = upgrade.effects[tag];
		(upgradeEffects[tag] ??= []).push([op, calc, upgrade]);
	}

	return upgrade;
}

function totalUpgradeEffect(tag, start = new Decimal(1)) {
	return upgradeEffects[tag].reduce((acc, [op, calc, upg]) =>
		upg.alwaysApply || hasUpgrade(upg.layer, upg.id) ? acc[op](calc()) : acc, start);
}

function effectOf(upgrade, tag) {
	return upgrade.effects[tag][1]();
}
let modInfo = {
	name: "eerT gniddoM ehT",
	id: "backwardstree",
	author: "yahtzee",
	pointsName: "points",
	modFiles: [ // loads async
		// "utils2/upgrades.js",
		// "layers/layers.js",
		"tree.js"
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 10000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "version 0.1.1",
}

let changelog = `<h1>changelog</h1><br/>
<h3>version 0.1.1 (2021-02-26)</h3><br/>
<ul>
<li>fixed version number</li>
</ul>
<h3>version 0.1.0 (2021-02-26)</h3><br/>
<ul>
<li>endgame of 40 accelerators/1e6 prestige points</li>
<li>added stuff to make upgrade effect display & calculation easier</li>
<li>created game with 5 prestige upgrades and the accelerator layer</li>
<li>probably the last update considering my habit of abandoning stuff</li>
</ul>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = [];

function getStartPoints(){
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true;
}

// Calculate points/sec!
function getPointGen() {
	return totalUpgradeEffect("points");
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {} }

// Display extra things at the top of the page
var displayThings = []

// Determines when the game "ends"
function isEndgame() {
	return false; // player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
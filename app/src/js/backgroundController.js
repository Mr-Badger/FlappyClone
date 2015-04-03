window.BackgroundController = (function() {
	'use strict';
	var that;

	var fudgeFactor = 1;

	var houseStartCount = 10;
	var houseEndPosY = -5;
	var houseSpawnChance = 0.03;
	var houseSpawnCooldown = 0.7;

	var cloudStartCount = 5;
	var cloudEndPosY = -14;
	var cloudSpawnChance = 0.01;
	var cloudSpawnCooldown = 2.5;

	var BackgroundController = function(el, game, gameState) {
		that = this;
		this.el = el;
		this.game = game;
		this.gameState = gameState;
		this.clouds = $('#cloudlayer');
		this.houses = $('#houselayer');
		this.lastHouseSpawnTime = 0;
		this.lastCloudSpawnTime = 0;
	};

	//Runs on every frame, checks if it's time to spawn an new cloud or a house, or to remove one.
	BackgroundController.prototype.onFrame = function(delta) {
		var now = new Date() / 1000;
		if(!this.gameState.gameEnded) {
			if(now > houseSpawnCooldown + this.lastHouseSpawnTime && houseSpawnChance > Math.random()) {
				this.lastHouseSpawnTime = now;
				this.spawnHouse();
			}
			this.cullHouses();
		}
		if(now > cloudSpawnCooldown + this.lastCloudSpawnTime && cloudSpawnChance > Math.random()) {
			this.lastCloudSpawnTime = now;
			this.spawnCloud();
		}
		this.cullClouds();
	};

	//Generates a random house dom object and appends it into the game
	BackgroundController.prototype.spawnHouse = function() {
		var type = Math.floor(Math.random() * 4);
		var house = $('<div>').addClass('house');
		if(Math.random() > 0.65) {
			house.addClass('bg');
		}
		if(type !== 0) {
			house.addClass('type' + type);
		}
		this.houses.append(house);
		setTimeout(function() {
			house.addClass('slide');
		}, 1);
	};

	//Generates a random cloud dom object and appends it into the game
	BackgroundController.prototype.spawnCloud = function() {
		var puffs = 5 + Math.floor(Math.random() * 5);
		var offsetY = 10 + Math.random() * 15;
		var cloud = $('<div>').addClass('cloud').css('top', offsetY + 'em');
		var i, x, y, rand;

		for(i = 0; i < puffs; i++) {
			rand = Math.random() * Math.PI * 2;
			x = 4 + Math.cos(rand) * 4;
			y = 1.5 + Math.sin(rand) * 1.5;
			var puff = $('<div>').addClass('puff').css({'left': x + 'em','top': y + 'em'});
			cloud.append(puff);
		}
		this.clouds.append(cloud);
	};

	//Populates the background with houses when player resets the game
	BackgroundController.prototype.populateHouses = function() {
		var step = 48/houseStartCount;
		for(var i = 0; i < houseStartCount; i++) {
			this.spawnHouse();
			var house = this.houses.children()[i];
			var offsetX = i * step + (Math.random() * step * 0.75);
			$(house).css('left', offsetX + 'em');
		}
	};

	//Populates the background with clouds when player resets the game
	BackgroundController.prototype.populateClouds = function() {
		var step = 48/cloudStartCount;
		for(var i = 0; i < cloudStartCount; i++) {
			this.spawnCloud();
			var cloud = this.clouds.children()[i];
			var offsetX = (i * step + Math.random() * step * 0.5) - 60;
			$(cloud).css('left', offsetX + 'em');
		}
	};

	//Removes any offscreen house from the game
	BackgroundController.prototype.cullHouses = function() {
		var first = this.houses.children(':first');
		var pos = first.position();
		if(pos !== undefined) {
			if(pos.left - fudgeFactor < houseEndPosY * this.game.gameEM) {
				first.remove();
			}
		}
	};

	//Removes any offscreen cloud from the game
	BackgroundController.prototype.cullClouds = function() {
		var first = this.clouds.children(':first');
		var pos = first.position();
		if(pos !== undefined) {
			if(pos.left - fudgeFactor < cloudEndPosY * this.game.gameEM) {
				first.remove();
			}
		}
	};

	//Stops the animation of the houses when the game ends.
	BackgroundController.prototype.stop = function() {
		var houses = this.houses.children();
		for(var i = 0; i < houses.length; i++) {
			var house = $(houses[i]);
			var posX = house.position().left;
			house.addClass('stop');
			house.css('left', posX);
		}
	};

	BackgroundController.prototype.reset = function() {
		this.clouds.empty();
		this.houses.empty();
		this.populateClouds();
		this.populateHouses();
	};

	return BackgroundController;
})();

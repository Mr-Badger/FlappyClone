window.BackgroundController = (function() {
	'use strict';
	var that;

	var fudgeFactor = 1;

	var houseEndPosY = -5;
	var houseSpawnChance = 0.03;
	var houseSpawnCooldown = 0.7;

	var cloudEndPosY = -12;
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
		}, 0.001);
	};

	BackgroundController.prototype.spawnCloud = function() {
		var puffs = 5 + Math.floor(Math.random() * 5);
		var offsetY = Math.random() * 15;
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

	BackgroundController.prototype.populateHouses = function() {
		for(var i = 0; i < 10; i++) {
			this.spawnHouse();
		}

		this.houses.children().each(function(index, house) {
			var offsetX = (Math.random() * 60) - 6;
			$(house).css('left', offsetX+'em');
		});
	};

	BackgroundController.prototype.populateClouds = function() {
		//todo
	};

	BackgroundController.prototype.cullHouses = function() {
		var first = this.houses.children(':first');
		var pos = first.position();
		if(pos !== undefined) {
			if(pos.left - fudgeFactor < houseEndPosY * this.game.gameEM) {
				first.remove();
			}
		}
	};

	BackgroundController.prototype.cullClouds = function() {
		var first = this.clouds.children(':first');
		var pos = first.position();
		if(pos !== undefined) {
			if(pos.left - fudgeFactor < cloudEndPosY * this.game.gameEM) {
				first.remove();
			}
		}
	};

	BackgroundController.prototype.stop = function() {
		this.houses.children().each(function(index, house) {
			house = $(house);
			var posX = house.position().left;
			house.addClass('stop');
			house.css('left', posX);
		});
		/*todo
		this.clouds.children().each(function(index, cloud) {
			cloud = $(cloud);
			cloud.addClass('slow');
		});
		*/
	};

	BackgroundController.prototype.reset = function() {
		this.clouds.empty();
		this.houses.empty();
		this.populateClouds();
		this.populateHouses();
	};

	return BackgroundController;
})();

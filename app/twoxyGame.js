var twoxyGame = {
	sceneAssistant: null,
	running: false,
	context: null,
	twoxyDot: null,
	score: 0, // will be calculated every second
	scoreNextIn: 0, // interval after which the score will be added
	scoreInterval: 0,
	
	choices: null,
	highscoreArgs: null,

	obstacles: {
		rect:[50], 
		count: 0, 
		obstacleWidth: 17, 
		obstacleHeight: 54, 
		nextIn: 0, 
		startIn: 0, 
		minusIn: 0, 
		movePace: 0, 
		moveNextIn: 0, 
		moveStartIn: 0,
		moveMinusIn: 0,
		maxMovePace: 0,
		missileImage: null
	},
	
	explosion: {
		img: null,
		width: 65,
		height: 75
	},

	// function bindings
	gameLoopInterval: null,
	gameLoopBind: null,

	// initializes the game
	initialize: function() {
		this.context.font = "normal 15px sans-serif";
		
		this.gameLoopBind = this.gameLoop.bind( this );
		this.twoxyDot.style.position = 'absolute';
		this.twoxyDot.style.width = '42px';
		this.twoxyDot.style.height = '52px';
		
		this.obstacles.missileImage = new Image( );
		this.obstacles.missileImage.src = 'images/missile.gif';
		
		this.explosion.img = new Image( );
		this.explosion.img.src = 'images/explosion.gif';
		
		this.startScreen( );
	},

	// starts a brand new game
	start: function() {
		
		this.running = true;
		
		this.obstacles.rect = [ 20 ];
		this.obstacles.nextIn = 5000; // 33 interval * 30 frames * 5 seconds
		this.obstacles.startIn = 5000;
		this.obstacles.minusIn = 50; // makes obstacles appear faster
		this.obstacles.maxMovePace = 25;
		this.obstacles.movePace = 5;
		this.obstacles.moveNextIn = 5000;
		this.obstacles.moveStartIn = 5000;
		this.obstacles.moveMinusIn = 200;
		
		// draw first obstacle
		this.obstacles.count = 1;
		this.obstacles.rect[ 0 ] = { x: 160, y: 0, width: this.obstacles.obstacleWidth, height: this.obstacles.obstacleHeight };
		
		// score
		this.score = 0;
		this.scoreNextIn = 1000;
		this.scoreInterval = 1000;
		
		// start interval loop
		this.gameLoopInterval = setInterval( this.gameLoopBind, 33 );
	},
	
	stop: function( ) {
		this.running = false;
		clearInterval( this.gameLoopInterval );
		
		// stop holding
		this.sceneAssistant.html1HoldEnd( );
		
		// draw explosion
		var twoxyX = parseInt( this.twoxyDot.style.left );
		var twoxyY = parseInt( this.twoxyDot.style.top );
		this.context.drawImage( this.explosion.img, twoxyX-10, twoxyY-12, this.explosion.width, this.explosion.height );
		
		Mojo.Controller.getAppController().playSoundNotification("vibrate", "",250);
		
		var highscore = this.sceneAssistant.controller.stageController.assistant.highscore;
		var lowestScore = highscore[ highscore.length-1 ].value;
		
		// show highscore
		if( this.score > lowestScore ) {
			this.choices = [{label: $L('Continue Game'), value: 'continue' },{label: $L('Submit Highscore'), value: 'submit'}]
			this.highscoreArgs = {addHighscore: true, score: twoxyGame.score};
		} else {
			this.choices = [{label: $L('Continue Game'), value: 'continue' },{label: $L('Show Highscore'), value: 'show'}]
			this.highscoreArgs = {addHighscore: false};
		}
		this.sceneAssistant.controller.showAlertDialog( {
			onChoose: function( value ) {
				if( value == 'submit' || value == 'show' ) {
					this.controller.stageController.pushScene( {name: "highscore", disableSceneScroller: true}, twoxyGame.highscoreArgs );
				} else {
					twoxyGame.startScreen( );
				}
			},
			title: $L('Game Over'),
			message: '',
			choices: twoxyGame.choices
		} );
	},
	
	startScreen: function( ) {
		this.twoxyDot.style.left = '140px';
		this.twoxyDot.style.top = '330px';
		this.context.fillStyle = "rgb(0,0,0)";
		this.context.fillRect( 0, 0, 320, 480 );
		this.context.fillStyle = "rgb(0,200,0)";
		this.context.fillText( $L('Score')+': 0', 10, 10 );
		
		var startText = $L('Pick up your ship');
		var textMetrics = this.context.measureText(startText);
		this.context.fillStyle = "rgb(0,200,0)";
		this.context.fillText( startText, 160-textMetrics.width/2, 200 );
	},

	gameLoop: function() {
		var i = 0;
		var distanceX = 0;
		var distanceY = 0;
		
		this.context.fillStyle = "rgb(0,0,0)";
		this.context.fillRect( 0, 0, 320, 480 );

		// get twoxyDot coordinates
		var twoxyX = parseInt( this.twoxyDot.style.left );
		var twoxyY = parseInt( this.twoxyDot.style.top );
		
		this.obstacles.nextIn -= 150;
		this.obstacles.moveNextIn -= 33;
		this.scoreNextIn -= 33;
		
		// draw obstacles
		this.context.fillStyle = "rgb(0,0,0)";
		for( i = 0; i < this.obstacles.count; i++ ) {
			// move obstacle
			this.obstacles.rect[ i ].y += this.obstacles.movePace;
			
			// draw obstacle
			this.context.drawImage( this.obstacles.missileImage, this.obstacles.rect[ i ].x, this.obstacles.rect[ i ].y, this.obstacles.rect[ i ].width, this.obstacles.rect[ i ].height );
			
			// check for collision
			distanceX = this.obstacles.rect[ i ].x - twoxyX;
			distanceY = this.obstacles.rect[ i ].y - twoxyY;
			// if > -obstacleWidth (-17) && < twoxyWidth (42) && > -obstacleHeight (-54) && < twoxyHeight (52)
			if( ( distanceX > -15 && distanceX < 40 ) && ( distanceY > -50 && distanceY < 50 ) ) {
				if( this.running ) {
					this.stop( );
				}
			}
			
			// check for last position
			if( this.obstacles.rect[ i ].y > 480-this.obstacles.rect[ i ].width ) {
				this.obstacles.rect.splice( i, 1 );
				i--;
				this.obstacles.count--;
			}
		}
		
		// draw new obstacle
		if( this.obstacles.nextIn <= 0 && this.obstacles.count < 20 ) {
			this.obstacles.startIn -= this.obstacles.minusIn+this.score*5;
			this.obstacles.nextIn = this.obstacles.startIn;
			this.obstacles.rect.push( { x: Math.floor( Math.random( )*320 ), y: -54, width: this.obstacles.obstacleWidth, height: this.obstacles.obstacleHeight } );
			this.obstacles.count++;
			
			if( this.obstacles.startIn < 0 ) {
				this.obstacles.startIn = 3000-(this.score*10);
			}
		}
		
		// update moving pace
		if( this.obstacles.moveNextIn <= 0 && this.obstacles.movePace < this.obstacles.maxMovePace ) {
			this.obstacles.movePace+=2;
			this.obstacles.moveStartIn -= this.obstacles.moveMinusIn;
			this.obstacles.moveNextIn = this.obstacles.moveStartIn;
		}
		
		// draw highscore
		this.context.fillStyle = "rgb(0,200,0)";
		this.context.fillText( $L('Score')+': '+this.score.toString( ), 10, 10 );
		
		// update score
		if( this.scoreNextIn <= 0 ) {
			this.score++;
			this.scoreNextIn = this.scoreInterval;
		}
		
	}
};

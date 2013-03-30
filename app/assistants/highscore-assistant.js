function HighscoreAssistant(argFromPusher) {
	if( typeof( argFromPusher.addHighscore ) != 'undefined' ) {
		this.addHighscore = argFromPusher.addHighscore;
	} else {
		this.addHighscore = false;
	}
	
	if( typeof( argFromPusher.score ) != 'undefined' ) {
		this.score = argFromPusher.score;
	} else {
		this.score = 0;
	}
	
}

HighscoreAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		
		// lables
		this.$.label1.setLabel( $L( 'Hall of Fame' ) );
		this.$.textField1.hintText = $L( 'Enter Name' );
		this.controller.modelChanged( this.highscoreName, this );
		
		// get highscore
		this.highscore = this.controller.stageController.assistant.highscore;
		
		if( !this.addHighscore ) {
			this.highscoreName.disabled = true;
			this.controller.modelChanged( this.highscoreName, this );
		}
		
		this.displayHighscore( );
	},
	displayHighscore: function( ) {
		this.highscoreList.items = this.highscore;
		this.controller.modelChanged( this.highscoreList, this );
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
		this.controller.stageController.assistant.saveHighscore();
	},
	deactivate: function( ) {
		this.controller.stageController.assistant.saveHighscore();
	},
	textField1Change: function(inSender, event) {
		var newElement = {};
		newElement.label = this.highscoreName.value;
		newElement.value = this.score;
		
		if( newElement.label != '' ) {
			for( var i = 0; i < this.highscore.length; i++ ) {
				if( this.highscore[ i ].value < newElement.value ) {
					this.highscore.splice( i, 0, newElement );
					break; 
				}
			}
			
			// remove last element if array > 10
			while( this.highscore.length > 10 ) {
				this.highscore.pop( );
			}
			
			this.highscoreName.disabled = true;
			this.highscoreName.value = '';
			this.controller.modelChanged( this.highscoreName, this );
			this.controller.stageController.assistant.saveHighscore();
			this.displayHighscore( );
		}
	}
};
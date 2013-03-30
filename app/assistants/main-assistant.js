function MainAssistant(argFromPusher) {
}

MainAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.$.header1.setLabel( $L( 'Twoxy' ) );
		this.$.button2.setLabel( $L( 'Start Game' ) );
		this.$.button1.setLabel( $L( 'Show Highscore' ) );
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	button2Tap: function(event, inSender) {
		this.controller.stageController.pushScene({name: "game", disableSceneScroller: true});
	},
	button1Tap: function(inSender, event) {
		this.controller.stageController.pushScene({name: 'highscore', disableSceneScroller: true}, {addHighscore: false});
	}
};
function GameAssistant(argFromPusher) {
}

GameAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.controller.enableFullScreenMode(true);
		
		// get needed objects
		this.twoxyDot = this.controller.get( 'twoxyDot' );
		this.gameField = this.controller.get( 'gameField480' );

		// initialize game
		twoxyGame.context = this.gameField.getContext( '2d' );
		twoxyGame.twoxyDot = this.twoxyDot;
		twoxyGame.sceneAssistant = this;
		
		twoxyGame.initialize( );
		
		twoxyGame.gameLoop( );
		
		// event handler for twoxydot
		this.dragStartHandler = this.html1Hold.bindAsEventListener( this );
		this.draggingHandler = this.html1Drag.bindAsEventListener( this );
		this.dragEndHandler = this.html1HoldEnd.bindAsEventListener( this );
		
		// install event handler for twoxydot movement
		Element.observe( this.twoxyDot, Mojo.Event.dragStart, this.dragStartHandler );
		this.controller.listen(this.controller.document, Mojo.Event.stageDeactivate,this.html1HoldEnd.bind( this ), true );
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
		Element.stopObserving( this.twoxyDot, Mojo.Event.dragging, this.draggingHandler );
		Element.stopObserving( this.twoxyDot, Mojo.Event.dragEnd, this.dragEndHandler );
		Element.stopObserving( this.twoxyDot, Mojo.Event.dragStart, this.dragStartHandler );
	},
	html1Hold: function(event) { // dragStartHandler

		twoxyGame.start( );

		Element.observe( this.twoxyDot, Mojo.Event.dragging, this.draggingHandler );
		Element.observe( this.twoxyDot, Mojo.Event.dragEnd, this.dragEndHandler );
		
		Event.stop( event );
	},
	html1Drag: function( event ) {
		
		this.twoxyDot.style.left = (Event.pointerX( event.move )-21).toString()+'px';
		this.twoxyDot.style.top = (Event.pointerY( event.move )-80).toString()+'px';
		Event.stop( event );
	},
	html1HoldEnd: function(event) {
		if( twoxyGame.running ) {
			twoxyGame.stop( );
		}
		Element.stopObserving( this.twoxyDot, Mojo.Event.dragging, this.draggingHandler );
		Element.stopObserving( this.twoxyDot, Mojo.Event.dragEnd, this.dragEndHandler );
	},
	html1Tap: function(inSender, event) {
		this.twoxyDot.style.left = (Event.pointerX( event.down )-21).toString()+'px';
		this.twoxyDot.style.top = (Event.pointerY( event.down )-26).toString()+'px';
		
		twoxyGame.startScreen( );
	}
};
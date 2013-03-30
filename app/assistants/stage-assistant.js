function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	this.fetchHighscore( );
	this.controller.pushScene({name: "main", disableSceneScroller: true});
	this.controller.setWindowOrientation("up");
};

StageAssistant.prototype.fetchHighscore = function( ) {
	this.db = new Mojo.Depot( 
		{name: 'twoxyDB', version:1, estimatedSize: 5000, replace: false},
		this.getHighscore.bind( this )
	);
};

StageAssistant.prototype.getHighscore = function( ) {
	this.db.simpleGet( 'highscore', this.loadHighscore.bind( this ) );
};

StageAssistant.prototype.loadHighscore = function( score ) {
	if( score === null ) {
		this.saveHighscore( );
	} else {
		this.highscore =  score;
	}
};

StageAssistant.prototype.saveHighscore = function( ) {
	this.db.add( 'highscore', this.highscore );
};

StageAssistant.prototype.highscore = [
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0},
	{label: "---",value: 0}
	];
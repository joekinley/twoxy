opus.Gizmo({
	name: "game",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	t: 0,
	h: 452,
	styles: {
		zIndex: 2
	},
	chrome: [
		{
			name: "html1",
			content: "<canvas id=\"gameField480\" width=\"320\" height=\"480\" class=\"cssMainCanvas\"></canvas>\n",
			ontap: "html1Tap",
			onhold: "",
			onholdEnd: "",
			type: "Palm.Mojo.Html",
			l: 0,
			r: "",
			w: "320",
			t: 0,
			b: "",
			h: "480",
			styles: {
				border: "0",
				borderColor: "",
				borderStyle: "solid"
			}
		},
		{
			name: "twoxyDot",
			src: "images/ship.gif",
			className: "twoxyDot",
			type: "Palm.Picture",
			l: 0,
			w: "42",
			t: 233,
			h: "52"
		}
	]
});
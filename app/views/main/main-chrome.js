opus.Gizmo({
	name: "main",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	h: "100%",
	styles: {
		zIndex: 2,
		bgColor: "",
		bgImage: "images/background.gif"
	},
	chrome: [
		{
			name: "header1",
			label: "Twoxy",
			type: "Palm.Mojo.Header",
			l: 0,
			t: 0
		},
		{
			name: "html1",
			type: "Palm.Mojo.Html",
			l: 0,
			t: 50,
			h: 153,
			styles: {
				textColor: "#ffffff"
			}
		},
		{
			name: "button2",
			ontap: "button2Tap",
			disabled: undefined,
			label: "Start Game",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 226
		},
		{
			name: "button1",
			ontap: "button1Tap",
			disabled: undefined,
			label: "Show Highscore",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 263
		}
	]
});
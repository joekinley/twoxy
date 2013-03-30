opus.Gizmo({
	name: "highscore",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	h: "100%",
	styles: {
		zIndex: 2,
		bgImage: "images/background.gif"
	},
	chrome: [
		{
			name: "textField1",
			modelName: "highscoreName",
			maxLength: "12",
			hintText: "Name",
			requiresEnterKey: true,
			onchange: "textField1Change",
			type: "Palm.Mojo.TextField",
			l: 0,
			t: 50
		},
		{
			name: "label1",
			label: "Hall of Fame",
			type: "Palm.Mojo.Label",
			l: 0,
			t: 51,
			styles: {
				bold: true,
				underline: true,
				textColor: "#00C800",
				fontSize: "28px",
				oneLine: false,
				opacity: 1,
				textAlign: "center"
			}
		},
		{
			name: "scroller1",
			scrollPosition: {
				left: 0,
				top: 0
			},
			type: "Palm.Mojo.Scroller",
			l: 0,
			t: 152,
			styles: {
				cursor: "move",
				overflow: "hidden"
			},
			controls: [
				{
					name: "list1",
					dropTarget: true,
					modelName: "highscoreList",
					items: [],
					useSampleData: false,
					title: undefined,
					itemHtml: "<div class=\"highscore\">\n  <span class=\"label\">#{label}</span>\n  <span class=\"score\">#{value}</span>\n</div>",
					swipeToDelete: false,
					reorderable: false,
					type: "Palm.Mojo.List",
					l: 43,
					w: 240,
					t: 0,
					h: 100,
					styles: {
						textColor: "#00C800"
					}
				}
			]
		}
	]
});
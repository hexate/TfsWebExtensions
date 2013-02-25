TFS.module("TfsWebExtensions.TaskBoard",["TFS.Host", "TFS.Admin", "TFS.WorkItemTracking", "TFS.Agile.TaskBoard"], function () {
	var moduleBaseUrl = TFS.getModuleBase("TfsWebExtensions.TaskBoard");
	var digits = /\d+/;
	var wIds = $('[id^="tile-"]').map(function() { return digits.exec(this.id)[0]; }).get();
	var wim = TFS.WorkItemTracking.WorkItemStore.getDefault().workItemManager;
	
	function isBoard() {
		return TFS.Host.TfsContext.getDefault().navigation.currentController == "boards";
	}
	function init() {
		$("<link type='text/css' rel='stylesheet' href='" + moduleBaseUrl + "Mindbody.Tweaks.css' />").appendTo($("head").last());
	}
	function recolorTiles() {
		wim.beginGetWorkItems(wIds, function(workItems) { 
			$.each(workItems, function(index, workItem) {
				var id = workItem.fieldMap.ID.getValue();
				var wType = workItem.fieldMap["SYSTEM.WORKITEMTYPE"].getValue();

				if (wType == "Bug") {
					var $tile = $("#tile-" + id);
					$tile.addClass("bugTile");
				}
			});
		});
	}
	
	init();
	if (isBoard) {
		recolorTiles();
	}
	
	return {
	};
});

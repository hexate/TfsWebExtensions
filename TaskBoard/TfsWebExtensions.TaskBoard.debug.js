define([
	"require",
	"exports",
	"Presentation/Scripts/TFS/TFS",
	"Presentation/Scripts/TFS/TFS.Core",
	"Presentation/Scripts/TFS/TFS.Host",
	"Presentation/Scripts/TFS/TFS.OM",
	"Presentation/TestScripts/Resources/TFS.Resources.Common",
	"Presentation/Scripts/TFS/TFS.UI.Controls",
	"Presentation/Scripts/TFS/TFS.UI.Controls.Menus",
	"WorkItemTracking/Scripts/TFS.WorkItemTracking"
], function (require, exports, tfs, Core, TfsHost, TfsOm, CommonResources, Controls, MenuControls, WorkItemTracking) { 
	var moduleBaseUrl = TFS.getModuleBase("TfsWebExtensions.TaskBoard");
	var digits = /\d+/;
	var wIds = $('[id^="tile-"]').map(function() { return digits.exec(this.id)[0]; }).get();
	var wim = TFS.OM.TfsTeamProjectCollection.getDefaultConnection().getService(TFS.WorkItemTracking.WorkItemStore).workItemManager;
	
	function isBoard() {
		return TFS.Host.TfsContext.getDefault().navigation.currentController == "boards";
	}
	function init() {
		$("<link type='text/css' rel='stylesheet' href='" + moduleBaseUrl + "TfsWebExtensions.TaskBoard.css' />").appendTo($("head").first());
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
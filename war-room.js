var $newUnitAffiliationSelector;
var $newUnitNumberSelector;
var $newUnitTypeSelector;
var $newUnitTypeOptions;
var $newUnitSizeSelector;
var $newUnitSizeOptions;
var $friendlyListElement;
var $hostileListElement;

var map;
var mapView = 
	{
		longitude: 0,
		latitude: 0,
		zoom: 0,
		type: 'r'
	}	
var drawingManager;
var units = [];

var unitTools = new UnitTools();
var saveLoadTools = new SaveLoadTools();



function initialize()
{
	// setup map
	map = new Microsoft.Maps.Map('#ui-map');
	Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
		var dt = Microsoft.Maps.DrawingTools;
		var da = dt.DrawingBarAction;
		var tools = new dt(map);
		tools.showDrawingManager(function (manager) {
			manager.setOptions({
				drawingBarActions: da.all
			});
			drawingManager = manager;
		});
	});

	// setup map change event
	Microsoft.Maps.Events.addHandler(map, 'viewchangeend', function (event) {
		mapView.longitude = map.getCenter().longitude;
		mapView.latitude = map.getCenter().latitude;
		mapView.zoom = map.getZoom();
		saveLoadTools.saveMapView();
	});

	// setup map type change event
	Microsoft.Maps.Events.addHandler(map, 'maptypechanged', function (event) {
		mapView.type = map.getMapTypeId();
		saveLoadTools.saveMapView();
	});

	// get UI elements
	$newUnitAffiliationSelector = document.getElementById('new-unit-affiliation');
	$newUnitNumberSelector = document.getElementById('new-unit-number');
	$newUnitTypeSelector = document.getElementById('new-unit-type');
	$newUnitTypeOptions = $newUnitTypeSelector.options;
	$newUnitSizeSelector = document.getElementById('new-unit-size');
	$newUnitSizeOptions = $newUnitSizeSelector.options;
	$friendlyListElement = document.getElementById('unit-list-friendly');
	$hostileListElement = document.getElementById('unit-list-hostile');

	saveLoadTools.load();
}



function updateUI()
{
	// empty map
	map.entities.clear();

	for (let unit of units) {
		// new pushpin options
		let pushpinOptions = {
			icon: unitTools.getUnitIconImage(unit),
			title: unit.sizeSymbol,
			subTitle: unitTools.getUnitDisplayName(unit),
			draggable: true,
			anchor: { x: unit.anchorX, y: unit.anchorY }
		};

		// create new pushpin and apply to map
		let pushpin = new Microsoft.Maps.Pushpin({ longitude: unit.longitude, latitude: unit.latitude }, pushpinOptions);

		// adding pushpin to unit
		unit.pushpinId = pushpin.id;

		// add dragend event handler to pushpin
		Microsoft.Maps.Events.addHandler(pushpin, 'dragend', (event) => {
			unitTools.setUnitLocation(event);
			saveLoadTools.saveUnits();
		});

		// add to map
		map.entities.push(pushpin);
	}

	// set map view
	map.setView({
		mapTypeId: mapView.type,
		center: new Microsoft.Maps.Location(mapView.latitude, mapView.longitude),
		zoom: mapView.zoom,
		type: mapView.type
	});

	// create unit list html string
	let unitListFriendlyHtml = '';
	let unitListHostileHtml = '';
	for(let unit of units)
	{
		if(unit.affiliation == 'friendly')
		{
			unitListFriendlyHtml += `<li>${unitTools.getUnitDisplayName(unit)}<br><input type="button" value="Delete" onclick="deleteUnit(${unit.id})"></li>`;	
		}
		else
		{
			unitListHostileHtml += `<li>${unitTools.getUnitDisplayName(unit)}<br><input type="button" value="Delete" onclick="deleteUnit(${unit.id})"></li>`;
		}
	}

	// update unit list element
	$friendlyListElement.innerHTML = unitListFriendlyHtml;
	$hostileListElement.innerHTML = unitListHostileHtml;
}
function createUnit()
{
	// create new unit
	let newUnit = JSON.parse(JSON.stringify(unitTools.templateUnit));
	newUnit.id = unitTools.getNewUnitId(units);
	newUnit.affiliation = $newUnitAffiliationSelector.value;
	newUnit.iconType = $newUnitTypeOptions[$newUnitTypeSelector.selectedIndex].getAttribute('data-icon');
	newUnit.anchorX = $newUnitTypeOptions[$newUnitTypeSelector.selectedIndex].getAttribute('data-anchor-x');
	newUnit.anchorY = $newUnitTypeOptions[$newUnitTypeSelector.selectedIndex].getAttribute('data-anchor-y');
	newUnit.number = $newUnitNumberSelector.value;
	newUnit.type = $newUnitTypeSelector.value;
	newUnit.size = $newUnitSizeSelector.value;
	newUnit.sizeSymbol = $newUnitSizeOptions[$newUnitSizeSelector.selectedIndex].getAttribute('data-symbol');
	newUnit.longitude = map.getCenter().longitude;
	newUnit.latitude = map.getCenter().latitude;

	// store new unit
	units.push(newUnit);	
	
	updateUI();
	saveLoadTools.saveUnits();
}



function deleteUnit(unitId)
{
	// get index of unit to delete
	let index = 0;
	for(unit of units)
	{
		if(unit.id == unitId)
		{
			break;
		}
		index++;
	}

	// delete unit
	units.splice(index, 1);

	updateUI();
	saveLoadTools.saveUnits();
}



function debugUnits() 
{
	console.log('Debugging');
	console.log('units:');
	console.log(units);
	console.log('map view:');
	console.log(mapView);
}



function clearData()
{
	let confirmed = confirm("Clear All Units and Drawings?");

	if(confirmed)
	{
		// empty units and map
		units = [];
		map.entities.clear();
		drawingManager.clear();
		updateUI();
		saveLoadTools.saveUnits();
	}
}
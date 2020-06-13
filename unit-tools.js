class UnitTools
{
	constructor()
	{
		this.templateUnit =
		{
			id: 1,
			affiliation: 'friendly',
			iconType: 'infantry',
			number: 1,
			type: 'Infantry',
			size: 'Regiment',
			sizeSymbol: 'III',
			longitude: 0, 
			latitude: 0,
			pushpinId: 0,
			anchorX: 16,
			anchorY: 12
		};
	}



	getUnitDisplayName(unit)
	{
		let unitOrdinal = 'th';
		if(unit.number < 11 || unit.number > 19)
		{
			if(unit.number % 10 == 1)
			{
				unitOrdinal = 'st';
			}
			else if (unit.number % 10 == 2) {
				unitOrdinal = 'nd';
			}
			else if (unit.number % 10 == 3) {
				unitOrdinal = 'rd';
			}
		}

		return `${unit.number}${unitOrdinal} ${unit.type} ${unit.size}`;
	}



	getUnitIconImage(unit)
	{
		return `icon-${unit.iconType}-${unit.affiliation}.png`;
	}



	getNewUnitId(units)
	{
		let highestId = 0;
		for(let unit of units)
		{
			if(unit.id > highestId)
			{
				highestId = unit.id;
			}
		}

		return highestId + 1;
	}



	setUnitLocation(event)
	{
		for (let unit of units) {
			if (unit.pushpinId == event.target.id) {
				unit.longitude = event.target.getLocation().longitude;
				unit.latitude = event.target.getLocation().latitude;
			}
		}
	}
}
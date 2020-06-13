class SaveLoadTools
{
	constuctor()
	{

	}



	saveUnits()
	{
		localStorage.savedUnits = JSON.stringify(units);
	}



	saveMapView()
	{
		localStorage.mapView = JSON.stringify(mapView);
	}



	load() 
	{
		if (localStorage.savedUnits != null) 
		{
			// load units
			units = JSON.parse(localStorage.savedUnits);
		}

		
		if (localStorage.mapView != null) 
		{
			// load map view
			mapView = JSON.parse(localStorage.mapView);
		}

		updateUI();
	}



	clearLocalStorage()
	{
		localStorage.removeItem('savedUnits');
		localStorage.removeItem('mapView');
	}
}
# Salesforce Lightning Web Component Project: Weather Component with forecast and location

This Lightning Web Component (LWC) allows users to retrieve weather information for a specified location using the weatherAPI.com (https://www.weatherapi.com/) service.

## Features

- Enter a city name to retrieve current weather conditions.
- Display current temperature, condition, and an icon representing the weather condition.
- Display the day's highest and lowest temperatures.
- Displays the location using Google Maps with a marker.

## Steps to follow before cloning the repo into the org:

1. Create a free account on WeatherAPI.com and copy API key.
2. Create a Permission Set and assign it to yourself from: the current Permission set, go to Manage Assignments => Add Assignment => Select ‘System Admin’ => Next => Assign. If we do not create a Permission Set before creating Named Credential, then we will get the following error: “The developerName parameter value doesn't exist or you may not have permission to access it.”
3. Create External Credential, Setup => Named Credential => External Credential:
   - Give a label like Weather API Credentials and select Custom here as we just need to store the API key.
   - After creating this External Credential, scroll down to Principal => New, enter Parameter Name as Admin User => In Parameter 1, Name = key and Value = enter the API key from the weatherAPI.com.
   - Similarly Add Custom Header also, Name = key and Value = {!$Credential.WeatherAPICredentials.key}
4. Create Named Credential, Setup => Named Credential => New: Label/Name = WeatherAPI, URL = https://api.weatherapi.com/v1 and choose Weather API Credentials in External Credential.
5. Now assign it to the Profile, Setup => Profile => System Admin => Enabled External Credential Principal Access => Edit => Add WeatherAPI in the Enabled External Credential Principals.

## Additional info regarding weather API 

- Base URL: http://api.weatherapi.com/v1
- API and	API Methods:
  • for Current weather API, use	/current.json or /current.xml API method - Current object contains current or realtime weather information for a given city.
  • for Forecast API, use	/forecast.json or /forecast.xml API method - Forecast object contains astronomy data, day weather forecast (like max/min temperature, average temperature) and hourly interval weather information for a given city.
- Parameters:
  • q is a required field and could be following:
    1. Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
    2. city name e.g.: q=Paris
    3. US zip e.g.: q=10001
    4. UK postcode e.g: q=SW1
    5. Canada postal code e.g: q=G2J
  • days is a required field only with forecast API methods. It specifies the Number of days of forecast required and its value ranges between 1 and 14. e.g: days=5.

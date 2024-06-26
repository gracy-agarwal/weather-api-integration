import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/WeatherAPI.getWeather';

export default class WeatherAPI extends LightningElement {
    city;
    region;
    country;
    temperature;
    condition;
    imageURL;
    maxTemperature;
    minTemperature;
    icon;
    marker = 'custom:custom26';
    mapMarkers;
    data;
    error;
   
    handleonchange(event) {
        this.city = event.target.value;
    }
    async buttonClick() {       
        getWeather({ city: this.city }).then((response) => {
            this.data = true;
            this.error = null;

            console.log("###Response : " + response);
            let parsedData = JSON.parse(response);

            this.country = parsedData.location.country;
            this.region = parsedData.location.region;
            
            this.temperature = parsedData.current.temp_c;
            this.imageURL = parsedData.current.condition.icon;
            this.condition = parsedData.current.condition.text;
            this.maxTemperature = parsedData.forecast.forecastday[0].day.maxtemp_c;
            this.minTemperature = parsedData.forecast.forecastday[0].day.mintemp_c;

            this.updateMap(parsedData.location.lon, parsedData.location.lat);
        })
        .catch((error) => {
            this.data = null;
            this.error = error;
            console.log('###Error : ' + JSON.stringify(error));
        });
    }

    // MAP
    updateMap(Longitude, Latitude) {
        if(Longitude!==null && Latitude!==null){
            this.mapMarkers = [
                {
                    location: { 
                        Latitude, 
                        Longitude 
                    },
                icon: this.marker, 
                title: this.city + ' - ' + this.region + ' - ' + this.country,
            }];
        }else{
            this.mapMarkers = [
                {
                    location: {
                        City: this.city,
                        Country:  this.country
                    },
                    icon: this.marker,
                    title: this.city + ' - '+ this.country,
                },
            ];
        }
    }
}

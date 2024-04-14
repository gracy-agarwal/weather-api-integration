public with sharing class WeatherAPI {
    @AuraEnabled
    public static string getWeather(String city){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherAPI/forecast.json?q='+ city +'&days=1');
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        return res.getBody();
    }
}

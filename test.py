import requests
import json 

 
def search_places_by_coordinate(id):
    endpoint_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${id}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw"
    params = {
        'id': id
    }

    res = requests.get(endpoint_url, params = params)
    results = json.loads(res.content)
    return results



places = search_places_by_coordinate('ChIJCzYy5IS16lQRQrfeQ5K5Oxw')

print(places)
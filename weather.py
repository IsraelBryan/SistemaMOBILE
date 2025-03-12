import requests

weather_url = "https://wttr.in/Salvador+Bahia"
try:
    response = requests.get(weather_url)
    data = print(response.text)
    if response.status_code == 200:
        print(response.text)
    else:
        print(f"Error: {response.status_code}")

except requests.exceptions.RequestException as e:
    print(e)
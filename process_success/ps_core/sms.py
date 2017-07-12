import urllib
import urllib2
import json

def sendSMS(number, text):
    print('-------SEND SMS-------')
    if type(number) is list:
        for phone_num in number:
            send(phone_num,text)
    else:
        send(number,text)

     
def send(number,text):
    fromNum='16502810009'

    if (len(number)==10):
        number="1"+number
    params = {
        'api_key': 'c6c5f94e',
        'api_secret': '1412a7dc297b99db',
        'to': number,
        'from': fromNum,
        'text': text
    }    
    url = 'https://rest.nexmo.com/sms/json?' + urllib.urlencode(params)

    request = urllib2.Request(url)
    request.add_header('Accept', 'application/json')
    response = urllib2.urlopen(request)
    print(response.code)
    if response.code == 200 :
        data = response.read()
        #Decode JSON response from UTF-8
        decoded_response = json.loads(data.decode('utf-8'))
        # Check if your messages are succesful
        messages = decoded_response["messages"]
        for message in messages:
            if message["status"] == "0":
                print "success"
    else :
        #Check the errors
        print "unexpected http {code} response from nexmo api". response.code
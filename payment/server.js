const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

var bodyData = { "name":"Stark Enterprise",
"currency":"USD",
"Cryptocurrency__c" : "Ethereum: 0x63247b378FD992bd231daacFC78ECe3d143067F5",
"billToContact":{    "firstName":"TONY888", "lastName":"Stark"  },
"soldToContact":{      "firstName":"Tony22222",      "lastName":"Stark",      "state":"NY",   "country":"USA" },
"creditCard":{    "cardType":"Visa",    "cardNumber":"4111111111111111",    "expirationMonth":10,    "expirationYear":2020,    "securityCode":"111"  },
"subscription":{    "contractEffectiveDate": "2016-10-01",    "termType":"TERMED",    "autoRenew":false,    "initialTerm":12,    "renewalTerm":12,    "subscribeToRatePlans":[      {        "productRatePlanId": "e2c5ed1082629d94cbf7fb35f1b738f9"      }    ]  } }

const instance = axios.create({
  baseURL: 'https://rest.apisandbox.zuora.com/v1/',
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

  }
});
const instance2 = axios.create({
  baseURL: 'https://rest.apisandbox.zuora.com/',
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
  }
});

var tokenGenerationBody = "client_id=0f195810-ea54-43bb-ab12-c28d83e0afa2&client_secret=UhrbvZupmAzTnn%2BfxZ%2Bj&grant_type=client_credentials";

var getOauthToken = () => {

    return instance2.post("oauth/token", tokenGenerationBody).then((res) => {
        console.log(res)
        let oauthToken = res.data["access_token"]
        instance.defaults.headers = {
            'Authorization': "Bearer " + oauthToken,
        };
        instance2.defaults.headers = {
            'Authorization': "Bearer " + oauthToken,
        };

    }).catch((err) => {
        console.log("well, " + err)
    })
}

// var getSessionCookie = () => {
//     return instance.post('/connections').then((res) => {
//         let setCookieVal = res.headers['set-cookie']
//         let cookie = setCookieVal[0]
//         instance.defaults.headers = {
//
//             'Cookie': cookie,
//         };
//     })
// }

var eventTriggerBody = {
  "active": true,
  "baseObject": "Account",
  "condition": "changeType == 'INSERT' && Account.Cryptocurrency__c != ''",
  "description": "Trigger an event when a new account using cryptocurrency as payment was created",
  "eventType": {
    "description": "A new account using cryptocurrency as payment was created",
    "displayName": "Cryptocurrency Payment Account Creation",
    "name": "CryptoPaymentAccountCreated"
  }
}

var setEventTrigger = () => {
    return instance2.post('/events/event-triggers', eventTriggerBody).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}



getOauthToken()




// getSessionCookie().then(() => getOauthToken()).catch("err, " + console.log)

var postUpdateZuora = () => {
    return instance.post('/accounts', bodyData)
      .then(function (response) {
        console.log(response.data.reasons);
        console.log("success")
      })
      .catch(function (error) {
        console.log(error);
      });
}


app.use(cors())
app.use(express.static('public'))


// app.get('/', (req, res) => res.sendFile())

app.post('/updateZuora', (req, res) => {
    postUpdateZuora().then(() => {
        res.send("done")

    })
})

app.listen(3000, () => console.log('Zuora crypto demo listening on port 3000!'))

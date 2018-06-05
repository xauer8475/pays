const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

var bodyData = { "name":"ABC Unlimited",
"currency":"USD",
"billToContact":{    "firstName":"Leo", "lastName":"Liu"  },
"soldToContact":{      "firstName":"Leo",      "lastName":"Liu",      "state":"CA",   "country":"USA" },
"creditCard":{    "cardType":"Visa",    "cardNumber":"4111111111111111",    "expirationMonth":10,    "expirationYear":2020,    "securityCode":"111"  },
"subscription":{    "contractEffectiveDate": "2016-10-01",    "termType":"TERMED",    "autoRenew":false,    "initialTerm":12,    "renewalTerm":12,    "subscribeToRatePlans":[      {        "productRatePlanId": "e2c5ed1082629d94cbf7fb35f1b738f9"      }    ]  } }

const instance = axios.create({
  baseURL: 'https://rest.apisandbox.zuora.com/v1/',
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

      'apiAccessKeyId': 'sada@sejalsoftware.com',
      'apiSecretAccessKey': 'Zuora2018'
  }
});

var getSessionCookie = () => {
    instance.post('/connections').then((res) => {
        let setCookieVal = res.headers['set-cookie']
        let cookie = setCookieVal[0]
        instance.defaults.headers = {

            'Cookie': cookie,
        };
    })
}

getSessionCookie();

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

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/updateZuora', (req, res) => {
    postUpdateZuora().then(() => {
        res.send("done")

    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

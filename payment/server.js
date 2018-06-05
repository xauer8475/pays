const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

var requestPayment = () => {
  console.log(userWallet);
  return web3.eth.sendTransaction({from: userWallet, to: "0x5ffe20900419FC29117F203898F89a6bF8f5367a", value: 400000000000232}, console.log)
};

var bodyData = { "name":"ABC Unlimited",
"currency":"USD",
"billToContact":{    "firstName":"Leo", "lastName":"Liu"  },
"soldToContact":{      "firstName":"Leo",      "lastName":"Liu",      "state":"CA",   "country":"USA" },
"creditCard":{    "cardType":"Visa",    "cardNumber":"4111111111111111",    "expirationMonth":10,    "expirationYear":2020,    "securityCode":"111"  },
"subscription":{    "contractEffectiveDate": "2016-10-01",    "termType":"TERMED",    "autoRenew":false,    "initialTerm":12,    "renewalTerm":12,    "subscribeToRatePlans":[      {        "productRatePlanId": "e2c5ed107d009b0eb623a387b41b7b36"      }    ]  } }

const instance = axios.create({
  baseURL: 'https://rest.apisandbox.zuora.com/v1/',
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

      'apiAccessKeyId': 'sada@sejalsoftware.com',
      'apiSecretAccessKey': 'Zuora2018'
  }
});

var postUpdateZuora = () => {
    return instance.post('/accounts', bodyData)
      .then(function (response) {
        console.log(response);
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

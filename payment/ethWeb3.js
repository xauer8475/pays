window.addEventListener("load", function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    console.log("metamask found")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("No web3? You should consider trying MetaMask!");

    window.web3 = new Web3(
      new Web3.providers.HttpProvider("https://localhost:7545")
    );
  }
  web3.eth.getAccounts((err, res) => {
      userWallet = res[0];
  })
  // APP >

});


var userWallet;

// returns transaction hash
requestPayment = () => {
  console.log(userWallet);
  return web3.eth.sendTransaction({from: userWallet, to: "0x5ffe20900419FC29117F203898F89a6bF8f5367a", value: 400000000000232}, console.log)
};

const instance = axios.create({'baseURL': 'http://localhost:3000'})

// hello = () => {
//     alert("hello")
// }

doneSendingEth = () => {
    instance.post('/updateZuora')
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

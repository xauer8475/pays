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


// returns transaction hash
requestPayment = () => {
    var fromWallet;
    web3.eth.getAccounts((err, res) => {

        console.log(res)
        fromWallet = res[0]
        web3.eth.sendTransaction({from: fromWallet, to: "0x5ffe20900419FC29117F203898F89a6bF8f5367a", value: web3.toWei("0.516", "ether")},
        (err, res) => {
            document.getElementById("toHide").style.display="none";
            document.getElementById("toShow").style.display="block";

            document.getElementById("titleToHide").style.display="none";
            document.getElementById("titleToShow").style.display="block";
            doneSendingEth();
            setTimeout(() => {
                document.getElementById("toHide").style.display="none";
                document.getElementById("toShow").style.display="none";

                document.getElementById("titleToHide").style.display="none";
                document.getElementById("titleToShow").style.display="none";

                document.getElementById("finalTitle").style.display="block";

            }, 6000)
        }
    )
    })


};

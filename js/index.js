const web3 = new Web3(Web3.givenProvider || 'https://data-seed-prebsc-1-s3.binance.org:8545/');
let isConnected = false
var address1;
var balance1;
var network_id;
var network_type;


async function unlockwallet(type) {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum.request({ method: "eth_requestAccounts" }).then(async function (address) {
            isConnected = true
            address1 = window.ethereum.selectedAddress;
            if (type == 1) {
                const logBalance = async () => {
                    balance1 = await web3.eth.getBalance(address1);
                    balance1 = await Math.round(Web3.utils.fromWei(balance1) * 1000) / 1000
                };
                await logBalance();
                const networkType = async () => {
                    network_type = await web3.eth.net.getNetworkType();
                    network_id = await web3.eth.net.getId();
                };
                await networkType();
                document.getElementById("btn-connect").innerHTML = "Connected";
                document.getElementById("address").innerHTML = address1;
                document.getElementById("amount").innerHTML = balance1;
                document.getElementById("networkType").innerHTML = network_type + " ChainID: " + network_id;

            }
            if (type == 2) {
                document.getElementById("btn-connect").innerHTML = "Connected";
                document.getElementById("Toaddress").innerHTML = address1;
                $('#transferAddress').attr('placeholder', 'Enter the Address');
                $('#transferAmount').attr('placeholder', 'Enter the Amount');
            }
        });
    } else {
        swal("Please Install Metamask Wallet", { icon: "warning" });
    }
}

function connect() {
    unlockwallet("1");
}
function connect1() {
    unlockwallet("2");
}


//-----------------------------Transfer Coin-------------------------------
function send() {
    if (isConnected == true) {
        if (document.getElementById("transferAddress").value != '' && document.getElementById("transferAmount").value != '') {
            try {
                var s = document.getElementById("transferAmount").value;
                web3.eth.sendTransaction({
                    from: window.ethereum.selectedAddress,
                    to: document.getElementById("transferAddress").value,
                    value: web3.utils.toWei(s.toString(), "ether")
                }, function (err, res) {
                    if (err) {
                        swal({
                            title: "Transaction Error", icon: "error", background: " #808080", button: false, timer: 1000,
                        });
                    }
                    if (res) {
                        swal({ title: "Your transaction is sent, Please wait for confirmation.", icon: "success", background: " #808080", button: false, timer: 5000, });
                        // setTimeout(function () {
                        //     $('.ajax-loader').css("display", "flex");
                        // }, 5000)
                    }
                }).then(async (receipt) => {
                    if (receipt.status === true) {
                        swal({
                            title: "Transaction Confirmed.", icon: "success", background: " #808080", button: false, timer: 3000,
                        });
                        console.log(receipt)
                    } else {
                        swal({
                            title: "Transaction Error", icon: "error", background: " #808080", button: false, timer: 5000,
                        });
                    }
                    //$('.ajax-loader').css("display", "none");
                })

            } catch (e) {
                console.log("end" + e)
            }
        } else {
            swal("Please Enter Transfer Address And Transfer Amount", { icon: "warning" });
        }


    } else {
        swal("Please Connect Wallet", { icon: "warning" });
    }
}
// web3.eth.net.getId().then(netId => {
//     switch (netId) {
//       case 1:
//         console.log('This is mainnet')
//         break
//       case 2:
//         console.log('This is the deprecated Morden test network.')
//         break
//       case 3:
//         console.log('This is the ropsten test network.')
//         break
//       default:
//         console.log('This is an unknown network.')
//     }
//   })
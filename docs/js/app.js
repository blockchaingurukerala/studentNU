App = {
  loading: false,
  contracts: {},  
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    //window.alert(App.account);
   
  },
  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const Sample = await $.getJSON('Student.json')
    App.contracts.Sample = TruffleContract(Sample)
    App.contracts.Sample.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.student = await App.contracts.Sample.deployed()
  },

  render: async () => {
    $("#meta").html(App.account)
    $("#showpages").show();
  } ,
  signUP :async ()=>{    
    var uname=$("#username").val();  
    var email=$("#email").val();  
    var ph=$("#ph").val();  
    await App.student.register(uname,email,ph,{from:App.account});
  } ,
   
  displayItems: async ()=>{
    $("#display").empty();
   var id=await App.student.id();
   var count=parseInt(id);
   for(var i=1;i<=count;i++){
     var student= await App.student.students(parseInt(i));
     var str="<tr><td>"+student[0]+"</td><td>"+student[1]+"</td><td>"+student[2]+"</td></tr>"
     $("#display").append(str);
   }
 
  }
}




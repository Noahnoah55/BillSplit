function addCustomer() {
  var name = document.getElementById('name').value;
  var total = document.getElementById('total').value;
  document.getElementById('name').value = "";
  document.getElementById('total').value = "";
  total = formatMoneyToInt(total);
  splitters.push([name,total]);
  updateUsers();
  console.log(splitters);
}

function formatMoneyToInt(input) {
  for (i in input){
    if (input[i] == '.') {
      var output = (input+"00").substring(0,parseInt(i)+3);
      output = output.replace(/[^0-9]/g, "");
      output = parseInt(output);
      return output;
    }
  }
  return parseInt(input) * 100
}

function formatMoneyToString(input) {
  console.log(input);
  output = ".";
  output = "$" + Math.floor(input / 100) + output + (String(input % 100)+"00").slice(0,2);
  return output;
}

function updateUsers() {
  var customerList = document.getElementById('customerList');
  while(customerList.lastChild){
    customerList.removeChild(customerList.lastChild);
  }
  for (let i = 0; i < splitters.length; i++){
    var container = document.createElement("div");
    var name = document.createElement("h1");
    var total = document.createElement("p");
    name.appendChild(document.createTextNode(splitters[i][0]));
    total.appendChild(document.createTextNode(formatMoneyToString(splitters[i][1])));
    container.appendChild(name);
    container.appendChild(total);
    customerList.appendChild(container);
  }
}

var splitters = new Array();

function addCustomer() {
  var name = document.getElementById('name').value;
  var total = document.getElementById('total').value;
  document.getElementById('name').value = "";
  document.getElementById('total').value = "";
  total = formatMoneyToInt(total);
  splitters.push([name,total]);
  updateFeePercentages();
  updateUsers();
}

function updateFees() {
  fees = formatMoneyToInt(document.getElementById('fees').value);
  tip = formatMoneyToInt(document.getElementById('tip').value);
  updateFeePercentages();
}

function updateFeePercentages() {
  total = 0;
  for (let i = 0; i < splitters.length; i++) {
    total += splitters[i][1];
  }
  tipPercent = tip / total;
  feePercent = fees/ total;
  updateUsers();
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
  output = ".";
  output = "$" + Math.floor(input / 100) + output + (String(input % 100)+"00").slice(0,2);
  return output;
}

function updateUsers() {
  var customerList = document.getElementById('customerList');
  while(customerList.lastChild){
    customerList.removeChild(customerList.lastChild);
  }
  // TODO: automate adding sections to container
  for (let i = 0; i < splitters.length; i++){
    var container = document.createElement("div");
    var name = document.createElement("h1");
    var subtotal = document.createElement("p");
    var total = document.createElement("p");
    var tip = document.createElement("p");
    var fees = document.createElement("p");
    var subtotalAmt = splitters[i][1];
    var feeAmt = splitters[i][1]*feePercent;
    var tipAmt = splitters[i][1]*tipPercent;
    var totalAmt = subtotalAmt+feeAmt+tipAmt;
    name.appendChild(document.createTextNode(splitters[i][0]));
    subtotal.appendChild(document.createTextNode(formatMoneyToString(subtotalAmt)));
    tip.appendChild(document.createTextNode(formatMoneyToString(tipAmt)))
    fees.appendChild(document.createTextNode(formatMoneyToString(feeAmt)))
    total.appendChild(document.createTextNode(formatMoneyToString(totalAmt)))
    container.appendChild(name);
    container.appendChild(subtotal);
    container.appendChild(tip);
    container.appendChild(fees);
    container.appendChild(total);
    customerList.appendChild(container);
  }
}

var splitters = new Array();
var fees = 0;
var tip = 0;
var feePercent = 0.0;
var tipPercent = 0.0;

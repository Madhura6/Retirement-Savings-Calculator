
var numbers = /^[0-9]+$/;  
var error1 = 0;
var error2 = 0;
var error3 = 0;
var error4 = 0;

var returnExpectation = 0.07;
var retirementYear = 2045;
var yearsAfterTarget = 30;
var highReturnFactor = 1.1;
var averageReturnFactor = 1;
var lowReturnFactor = 0.7;
var portfolioValue = 50000;
var oneTimeContribution;
var currentYear = 2016;
var inflation;
var monthlySavings;
var monthlyWithdrawal;

var maxYear = 2084;

var accum = [];
var withdraw = [];
var plot = [];

function numeric1(inputnum1)  
{  
var otc = document.form1.oneTimeContribution;
var errOTC = document.getElementById("errOTC");
var errOtcNum = document.getElementById("errOtcNum");

if(otc.value === ""){
	errOTC.style.visibility = "visible";
	errOtcNum.style.visibility = "hidden";
	error1 = 1; 
}

else{
if(inputnum1.value.match(numbers)){
	errOtcNum.style.visibility = "hidden";
	errOTC.style.visibility = "hidden";
	error1 =0;
	return true;
}
else{
	errOtcNum.style.visibility = "visible";
	errOTC.style.visibility = "hidden";
	error1 = 1; 
	return false; 
}

}
   }

function numeric2(inputnum2) {
var msv = document.form1.monthlySaving;
var errMS = document.getElementById("errMS");
var errMsNum = document.getElementById("errMsNum");

if(msv.value === ""){
	errMS.style.visibility = "visible";
	errMsNum.style.visibility = "hidden";
	error2 = 1; 
}

else{
if(inputnum2.value.match(numbers)){
	errMsNum.style.visibility = "hidden";
	errMS.style.visibility = "hidden";
	error2 = 0; 
	return true;
}
else{
	errMsNum.style.visibility = "visible";
	errMS.style.visibility = "hidden";
    error2 = 1; 	
	return false; 
}
}
}   


function numeric3(inputnum3) {
var mwr = document.form1.monthlyWithdrawal;
var errMW = document.getElementById("errMW");
var errMwNum = document.getElementById("errMwNum");

if(mwr.value === ""){
	errMW.style.visibility = "visible";
	errMwNum.style.visibility = "hidden";
	error3 = 1; 
}

else{
if(inputnum3.value.match(numbers)){
	errMwNum.style.visibility = "hidden";
	errMW.style.visibility = "hidden";
	error3 = 0; 
	return true;
}
else{
	errMwNum.style.visibility = "visible";
	errMW.style.visibility = "hidden";
	error3 = 1; 
	return false; 
}
}
}   


function numeric4(inputnum4) {
var inf = document.form1.inflation;
var errInf = document.getElementById("errInf");
var errInfNum = document.getElementById("errInfNum");

if(inf.value === ""){
	errInf.style.visibility = "visible";
	errInfNum.style.visibility = "hidden";
	error4 = 1; 
}

else{
if(inputnum4.value.match(numbers)){
	errInfNum.style.visibility = "hidden";
	errInf.style.visibility = "hidden";
	error4 = 0; 
	return true;
}
else{
	errInfNum.style.visibility = "visible";
	errInf.style.visibility = "hidden";
    error4 = 1; 	
	return false; 
}
}
}   

  
function calculate() {
  for (var row = 0; row < 3; row++) {
    accum[row] = [];
  }
	
  oneTimeContribution = parseInt(document.getElementById("oneTimeContribution").value);
  inflation = parseInt(document.getElementById("inflation").value)/100;
  monthlySavings = parseInt(document.getElementById("monthlySaving").value);
  
  var lowReturn = portfolioValue + oneTimeContribution;
  var averageReturn = portfolioValue + oneTimeContribution;
  var highReturn = portfolioValue + oneTimeContribution;

  accum[0][0] = lowReturn;
  accum[1][0] = averageReturn;
  accum[2][0] = highReturn;
  
  var loopCount = maxYear - currentYear;
  
  var yearlySaving = 12*monthlySavings;
  var calculatedInflation = 1+inflation;
  //lowReturn calculation
  var lCalcReturnFactor = 1+(returnExpectation*lowReturnFactor);
  for(var i=1;i<=loopCount;i++){
  	var prevValue = accum[0][i-1];
    var temp1 = (prevValue*lCalcReturnFactor);
	var expo = Math.pow(calculatedInflation,i);
    var temp2 = yearlySaving * expo;
    var newValue = temp1+temp2;
    accum[0].push(Math.round(newValue));
  }
  
  //averageReturn calculation
  var aCalcReturnFactor = 1+(returnExpectation*averageReturnFactor);
  for(var i=1;i<=loopCount;i++){
  	var prevValue = accum[1][i-1];
    var temp1 = (prevValue*aCalcReturnFactor);
    var expo = Math.pow(calculatedInflation,i);
    var temp2 = yearlySaving * expo;
    var newValue = temp1+temp2;
    accum[1].push(Math.round(newValue));
  }
  
	//highReturn calculation
  var hCalcReturnFactor = 1+(returnExpectation*highReturnFactor);
  for(var i=1;i<=loopCount;i++){
  	var prevValue = accum[2][i-1];
    var temp1 = (prevValue*hCalcReturnFactor);
    var expo = Math.pow(calculatedInflation,i);
    var temp2 = yearlySaving * expo;
    var newValue = temp1+temp2;
    accum[2].push(Math.round(newValue));
  }
	console.log(accum);
	return accum;

}

function calculateWithdraw() {
  
  var withdrawYear = retirementYear - currentYear; //2045-2016= 29
	var loopCount = maxYear-currentYear;
	 var monthlyWithdrawal = parseInt(document.getElementById("monthlyWithdrawal").value);
  var yearlyWithdrawal = 12*monthlyWithdrawal;
  var calculatedInflation = 1+inflation;
  
	for ( var row=0; row<3; row++){
		withdraw[row]= [];
	}
	
	//lowReturn withdraw
	var lCalcReturnFactor = 1+(returnExpectation*lowReturnFactor);
	for(var i=0;i<=loopCount;i++){
			if(i<=withdrawYear){
				withdraw[0].push(-1);
			}
			else if(i==withdrawYear+1){
				var l = accum[0][withdrawYear];
				var temp1 = l*lCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[0].push(Math.round(temp1-temp2));
			}
			else{
				var l = withdraw[0][i-1];
				var temp1 = l*lCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[0].push(Math.max(0,Math.round(temp1-temp2)));
			}
	}
	
	//averageReturn withdraw
	var aCalcReturnFactor = 1+(returnExpectation*averageReturnFactor);
	for(var i=0;i<=loopCount;i++){
			if(i<=withdrawYear){
				withdraw[1].push(-1);
			}
			else if(i==withdrawYear+1){
				var l = accum[1][withdrawYear];
				var temp1 = l*aCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[1].push(Math.round(temp1-temp2));
			}
			else{
				var l = withdraw[1][i-1];
				var temp1 = l*aCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[1].push(Math.max(0,Math.round(temp1-temp2)));
			}
	}
	
	//highReturn withdraw
	var hCalcReturnFactor = 1+(returnExpectation*highReturnFactor);
	for(var i=0;i<=loopCount;i++){
			if(i<=withdrawYear){
				withdraw[2].push(-1);
			}
			else if(i==withdrawYear+1){
				var l = accum[2][withdrawYear];
				var temp1 = l*hCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[2].push(Math.round(temp1-temp2));
			}
			else{
				var l = withdraw[2][i-1];
				var temp1 = l*hCalcReturnFactor;
				var expo = Math.pow(calculatedInflation,i);
				var temp2 = yearlyWithdrawal*expo;
				withdraw[2].push(Math.max(0,Math.round(temp1-temp2)));
			}
	}
	
  
	console.log(withdraw);
	return withdraw;

}

function calculatePlot(){
	for ( var row=0; row<3; row++){
		plot[row]= [];
	}
	
	for(var i=0;i<3;i++){
		for(var j=0;j<accum[i].length;j++){
			if(withdraw[i][j]==-1){
				plot[i][j] = {"Date":(currentYear+j),"Value":accum[i][j]};
			}
			else {
				plot[i][j] = {"Date":(currentYear+j),"Value":withdraw[i][j]};
			}
		}
	}
	var data = [];
	var lowDict = {"Amount":"Low","Data":plot[0]};
	var avgDict = {"Amount":"Average","Data":plot[1]};
	var highDict = {"Amount":"High","Data":plot[2]};
	data.push(lowDict);
	data.push(avgDict);
	data.push(highDict);
	console.log(data);
	if(error1 == 0 && error2 == 0 && error3 == 0 && error4 == 0){
	plotChart(data);
	return plot;}
}
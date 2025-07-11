const billInput = document.getElementById("bill-input");
const tipbuttons = document.querySelectorAll(".tip-percent-btn");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("num-people");
const tipAmountDisplay = document.getElementById('tip-amount-display');
const totalAmountDisplay = document.getElementById('total-amount-display');
const resetButton = document.getElementById('reset-button');

let currentBillValue = 0;
let currentTipValue = 0;
let numberOfPeopleValue = 1;

function setActive(clickedButton) {
    const custominput = document.getElementById("custom-tip-input");
    const buttons = document.querySelectorAll(".tip-percent-btn");
    buttons.forEach(btn => btn.classList.remove("pressed"));
    custominput.classList.remove("pressed");
    clickedButton.classList.add("pressed");
}

billInput.addEventListener('input', function(event){
    billInput.focus();
    currentBillValue = billInput.value;
    calculateTip();
});

tipbuttons.forEach(function(button){
    button.addEventListener('click', function(event){
        const clickedButton = event.target;
        currentTipValue = clickedButton.value;
        calculateTip();
    });
});

customTipInput.addEventListener('input', function(event){
    currentTipValue = customTipInput.value;
    setActive(this);
    calculateTip();
});

peopleInput.addEventListener("input", function(event){
    numberOfPeopleValue = peopleInput.value;
    calculateTip();
});

function calculateTip(){
    if(currentTipValue.toString().endsWith("%")){
        const tipvalue = currentTipValue.toString().replace("%", '');
        const tipPercentValue = (Number(tipvalue)/Number(currentBillValue))*100;

        const tipAmountPerPerson = Number(tipPercentValue)/Number(numberOfPeopleValue);
        const totalPerPerson = (Number(currentBillValue)/Number(numberOfPeopleValue))+(Number(tipPercentValue)/Number(numberOfPeopleValue));
        update(tipAmountPerPerson, totalPerPerson);
    }
    else{
        const tipAmountPerPerson = Number(currentTipValue)/Number(numberOfPeopleValue);
        const totalPerPerson = (Number(currentBillValue)/Number(numberOfPeopleValue))+(Number(currentTipValue)/Number(numberOfPeopleValue));
        update(tipAmountPerPerson, totalPerPerson);
    }
}

function update(tipAmountPerPerson, totalPerPerson){
    tipAmountDisplay.innerText = Number(tipAmountPerPerson).toFixed(2);
    totalAmountDisplay.innerText = Number(totalPerPerson).toFixed(2);
}

resetButton.addEventListener('click', function(event){
    currentBillValue = 0;
    currentTipValue = 0;
    numberOfPeopleValue = 1;

    tipAmountDisplay.innerText = "₹0.00";
    totalAmountDisplay.innerText = "₹0.00";
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    const custominput = document.getElementById("custom-tip-input");
    const buttons = document.querySelectorAll(".tip-percent-btn");
    buttons.forEach(btn => btn.classList.remove("pressed"));
    custominput.classList.remove("pressed");
});
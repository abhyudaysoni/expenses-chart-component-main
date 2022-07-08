/*

Doubts and issues
1. on hover display the amount
2. set bar height in %

*/

let days = new Array();
let amounts = new Array();
const bars = document.querySelector(".bars");

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

function setTotalAmount() {
    let total = 0;
    for (let i = 0; i < amounts.length; i++) {
        total += amounts[i];
    }
    const setTotal = document.querySelector(".total-amount");
    setTotal.innerHTML = `$${total.toFixed(2)}`;
}

function displayBars() {
    let maxAmount = amounts.max();

    for (let i = 0; i < days.length; i++) {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");
        const bar = document.createElement("div");
        const weekday = document.createElement("p");
        const amountTooltip = document.createElement("div");

        amountTooltip.innerHTML = `$${amounts[i]}`;
        amountTooltip.classList.add("amount");

        bar.classList.add("bar");

        if (amounts[i] === maxAmount) {
            bar.classList.add("max-amount");
        }

        bar.classList.add(`${days[i]}`);
        barContainer.classList.add(`${days[i]}`);
        weekday.innerHTML = `${days[i]}`;
        weekday.classList.add("days");

        bar.style.height = `${amounts[i]}%`;

        bar.style.maxWidth = "50px";
        bar.style.minWidth = "40px";

        barContainer.appendChild(amountTooltip);
        barContainer.appendChild(bar);
        barContainer.appendChild(weekday);
        bars.appendChild(barContainer);

        bar.addEventListener("mouseover", function () {
            amountTooltip.style.visibility = "visible";
        });

        bar.addEventListener("mouseleave", function () {
            amountTooltip.style.visibility = "hidden";
        });
        setTotalAmount();
    }
}

function collectingData(data) {
    for (let i = 0; i < data.length; i++) {
        days[i] = data[i].day;
        amounts[i] = data[i].amount;
    }
    displayBars();
}

fetch("./data.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => collectingData(data));

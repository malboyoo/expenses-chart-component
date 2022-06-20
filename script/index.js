"use strict";
const applyDataFile = async () => {
    const url = "../data.json";
    const response = await fetch(url);
    const data = await response.json();
    data.sort((a, b) => b.amount - a.amount);
    //adding to cyan color tu the higher spending day
    const higherDay = document.querySelector(`.${data[0].day} .candle`);
    higherDay.style.background = "var(--cyan)";
    for (let day of data) {
        const dayNode = document.querySelector(`.${day.day}`);
        console.log(Math.round((day.amount / data[0].amount) * 150) / 10);
        dayNode.style.minHeight = `${Math.round((day.amount / data[0].amount) * 150) / 10 + 2.6}rem`;
        const spanAmount = document.querySelector(`.${day.day} .pop-up span`);
        spanAmount.textContent = `$${day.amount}`;
        const popupNode = document.querySelector(`.${day.day} .pop-up`);
        dayNode.addEventListener("mouseenter", () => {
            popupNode.style.display = "flex";
        });
        dayNode.addEventListener("mouseleave", () => {
            popupNode.style.display = "none";
        });
    }
};
applyDataFile();

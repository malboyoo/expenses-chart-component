"use strict";
const applyDataFile = async () => {
    const url = "../data.json";
    const response = await fetch(url);
    const data = await response.json();
    data.sort((a, b) => b.amount - a.amount);
    //adding to cyan color to the current day
    const date = new Date();
    const dateDay = date.toDateString().split(" ")[0].toLowerCase();
    const higherDay = document.querySelector(`.${dateDay} .candle`);
    higherDay.style.background = "var(--cyan)";
    for (let day of data) {
        const dayNode = document.querySelector(`.${day.day}`);
        // candle height are caculated in % of each value according to the top value. (the +2.6rem is for the paragraph)
        dayNode.style.height = `${Math.round((day.amount / data[0].amount) * 150) / 10 + 2.6}rem`;
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

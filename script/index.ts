//creating interface of the file object
interface SpendingData {
   day: string;
   amount: number;
}
const applyDataFile = async () => {
   const url: string = "../data.json";
   const response = await fetch(url);
   const data: SpendingData[] = await response.json();

   data.sort((a, b) => b.amount - a.amount);

   //adding to cyan color to the current day
   const date: Date = new Date();
   const dateDay: String = date.toDateString().split(" ")[0].toLowerCase();
   const higherDay: HTMLDivElement = document.querySelector(`.${dateDay} .candle`)!;
   higherDay.style.background = "var(--cyan)";
   for (let day of data) {
      const dayNode: HTMLDivElement = document.querySelector(`.${day.day}`)!;

      // candle height are caculated in % of each value according to the top value. (the +2.6rem is for the paragraph)
      dayNode.style.height = `${Math.round((day.amount / data[0].amount) * 150) / 10 + 2.6}rem`;

      const spanAmount: HTMLSpanElement = document.querySelector(`.${day.day} .pop-up span`)!;
      spanAmount.textContent = `$${day.amount}`;

      const popupNode: HTMLDivElement = document.querySelector(`.${day.day} .pop-up`)!;

      dayNode.addEventListener("mouseenter", () => {
         popupNode.style.display = "flex";
      });
      dayNode.addEventListener("mouseleave", () => {
         popupNode.style.display = "none";
      });
   }
};
applyDataFile();

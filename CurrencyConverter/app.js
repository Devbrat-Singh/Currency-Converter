const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdownSelect = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

/*
 1st iteration ma select ma 1st "from" wala "select" ayega, phir hum ekk inner loop chalayanga usma har bar ell currCode select hoga phir hum har bar ekk new option banayanga aur select
 ma add kr denga select ma 2nd "to" wala "select" ayega aur same process krenga

 then 2nd iteration ma 

               <<select name="from">
                 <option value="USD"-->value selected>USD   -->inner text </option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="AUD">AUD</option> 
              </select>

              <select name="to">
                 <option value="INR" selected>INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="AUD">AUD</option> 
              </select>


 */

// Step 1: updates options value 
for (let select of dropdownSelect) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  //   For updating flag
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target); //if we click on "from" the evt.target will pass 1st container and click on "to" it will pass 2nd container
  });
}

// Step 2: Update Flag

function changeFlag(element) {
  let currCode = element.value;
  let country = countryList[currCode];
  let Img = element.parentElement.querySelector("img"); // element-->select   parentElement---> select-container -->  select-container img

  Img.src = `https://flagsapi.com/${country}/flat/64.png`;
  Img.alt = `${country}  flag`;
}

// Step 3 Function to convert the value
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = 1;
  }

  const base = fromCurr.value.toLowerCase(); // e.g. "usd"
  const target = toCurr.value.toLowerCase(); // e.g. "inr"
  const url = `${BASE_URL}/${base}.json`;

  let response = await fetch(url);
  let data = await response.json();
  console.log(data);

  let rate = data[base][target]; // → data["usd"]["inr"] → 83.12
  let finalAmount = amtval * rate;

  msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
};

//Step:4 Add event listner to Get exchange rate button

let Btn = document.querySelector(".chngBtn");

Btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

//Step 5: To updates states intially

// Initially 1usd=88.12 inr ma convert ho jayega without  exchange btn pa click kiya b/c we call updateExchangeRate() function very first 
window.addEventListener("load", () => {
  updateExchangeRate();
});

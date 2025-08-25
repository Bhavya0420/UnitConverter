const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const fromValue = document.getElementById("fromValue");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const units = {
  length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile"],
  weight: ["Kilogram", "Gram", "Pound", "Ounce"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
};

function populateUnits() {
  const selectedCategory = category.value;
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[selectedCategory].forEach((u) => {
    let option1 = new Option(u, u.toLowerCase());
    let option2 = new Option(u, u.toLowerCase());
    fromUnit.add(option1);
    toUnit.add(option2);
  });
}
populateUnits();

category.addEventListener("change", populateUnits);

convertBtn.addEventListener("click", () => {
  let value = parseFloat(fromValue.value);
  if (isNaN(value)) {
    result.textContent = "Enter a valid number!";
    return;
  }

  let from = fromUnit.value;
  let to = toUnit.value;
  let convertedValue;

  if (category.value === "length") {
    const factors = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34 };
    convertedValue = (value * factors[from]) / factors[to];
  } 
  else if (category.value === "weight") {
    const factors = { kilogram: 1, gram: 0.001, pound: 0.453592, ounce: 0.0283495 };
    convertedValue = (value * factors[from]) / factors[to];
  } 
  else if (category.value === "temperature") {
    if (from === to) convertedValue = value;
    else if (from === "celsius" && to === "fahrenheit") convertedValue = (value * 9/5) + 32;
    else if (from === "fahrenheit" && to === "celsius") convertedValue = (value - 32) * 5/9;
    else if (from === "celsius" && to === "kelvin") convertedValue = value + 273.15;
    else if (from === "kelvin" && to === "celsius") convertedValue = value - 273.15;
    else if (from === "fahrenheit" && to === "kelvin") convertedValue = (value - 32) * 5/9 + 273.15;
    else if (from === "kelvin" && to === "fahrenheit") convertedValue = (value - 273.15) * 9/5 + 32;
  }

  result.textContent = convertedValue.toFixed(2) + " " + to;
});

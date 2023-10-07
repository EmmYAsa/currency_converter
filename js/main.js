async function getCurrency(url) {
    try {
        let data = await fetch(url);
        let response = await data.json();

        showCurrency(response);

        let btn = document.querySelector("#result-btn");
        btn.addEventListener('click', () => {
            currentCurrency(response);
        });
    } catch (error) {
        console.error("Ошибка при загрузке данных: " + error.message);
    }
}

let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
getCurrency(url);

let box = document.querySelector("#other-value");
let box2 = document.querySelector("#name-value");
let box2_value = document.querySelector("#convert-value");

function currentCurrency(data) {
    if (!box.classList.contains("hidden")) {
        const selectedCurrency = box.value;
        const uah = parseFloat(document.querySelector("#uah-value").value);
        const result = convertCurrency(uah, findCurrencyRate(data, selectedCurrency));

        const resultBox = document.querySelector(".content");
        resultBox.innerHTML = `<p>Результат: ${result.toFixed(2)} ${selectedCurrency}</p>`;
    } else {
        const selectedCurrency2 = box2.value;
        const cur = parseFloat(box2_value.value);

        let result = convertCurrencyToUah(cur, findRateByCC(data, selectedCurrency2));

        const resultBox = document.querySelector(".content");
        resultBox.innerHTML = `<p>Результат: ${result.toFixed(2)} UAH</p>`;
    }
}

function findCurrencyRate(data, selectedCurrency) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].txt === selectedCurrency) {
            return data[i].rate;
        }
    }
    return 1;
}

function findRateByCC(data, selectedCurrency) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].cc === selectedCurrency) {
            return data[i].rate;
        }
    }
    return 1;
}

function showCurrency(data) {
    for (let i = 0; i < data.length; i++) {
        box.innerHTML += `<option value="${data[i].txt}">${data[i].txt}</option>`;
        box2.innerHTML += `<option value="${data[i].cc}">${data[i].cc}</option>`;
    }
}

function convertCurrency(uah, currency) {
    uah = parseFloat(uah);
    currency = parseFloat(currency);
    if (uah >= 1) {
        return uah / currency;
    }
    return 0;
}

function convertCurrencyToUah(cur, rate) {
    cur = parseFloat(cur);
    rate = parseFloat(rate);
    if (cur >= 1) {
        return cur * rate;
    }
    return 0;
}

const arrow = document.querySelector(".arrow");
const uahBlocks = document.querySelectorAll(".uah_block");
const otherBlocks = document.querySelectorAll(".other_block");

arrow.addEventListener('click', () => {
    uahBlocks.forEach(block => block.classList.toggle("hidden"));
    otherBlocks.forEach(block => block.classList.toggle("hidden"));
});

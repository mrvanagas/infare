const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')


// URL of the page we want to scrape
const url = "";

// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url)

    const $ = cheerio.load(data)

    const flight_info = $('.fly5-result')

    const htmlData = []

    flight_info.each ((i, el) => {
        const flight_info = {airport_name: '', flight_dates:'', flight_time: '', price: ''}
        flight_info.airport_name = $(el)
        .find('.flfrom')
        .text()
        .replace(/\s\s+/g, ' -> ');

        flight_info.flight_dates = $(el)
        .find('.fldate')
        .text()

        flight_info.flight_time = $(el)
        .find('.fltime')
        .text()

        flight_info.price = $(el)
        .find('.flprice, .flcur')
        .text()

        htmlData.push(flight_info)
    })
    console.dir(htmlData)
    fs.writeFile('flights.json', JSON.stringify(htmlData, null, 4), (err) => {
      if (err) {
        console.error(err)
        return;
      }
    })
    console.log("Finished scraping");
    // console.log(htmlData);
    
    
  } catch (err) {
    console.error(err);
  }
}


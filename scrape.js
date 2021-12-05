const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv');


// URL of the page we want to scrape
const url = "";

// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const flight_info = $('.fly5-result')

    //Array where scraped data will be stored
    const htmlData = []

    //Scraping info placed into relevant objects
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
        //Scraped info objects pushed into array
        htmlData.push(flight_info)
    })
    console.dir(htmlData)

    //Converts array objects to CSV string
    const csvString = [
      [
      "airport name",
      "flight_dates",
      "flight_time",
      "price"
    ],
    ...htmlData.map(flight_info => [
      flight_info.airport_name,
      flight_info.flight_dates,
      flight_info.flight_time,
      flight_info.price
      ])
    ]
    .map(e => e.join(';'))
    .join("\n")

    //Export data into CSV file
    writeStream.write(csvString)
    console.log("Finished scraping");
    
    
  } catch (err) {
    console.error(err);
  }
}
scrapeData()

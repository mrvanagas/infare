This is a scraper built with axios and cheerio and Javascript. 
To run the app, pull the code from the repository, install dependancies with "npm install" in the terminal and run the "node scrape" command in the terminal. In its current configuration, there is only 1 page load/request per app run.

In order for the scraper to work, a link, with relevant search settings, has to be placed in the URL identifier.

In its current configuration, it is meant to scrape fly540.com airlines for departing airports, flight dates, flight times and flight prices. When the data is first scraped, it is placed in an object array, then it is converted to a string and exported into a CSV file.

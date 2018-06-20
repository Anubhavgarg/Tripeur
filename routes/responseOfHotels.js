'use strict';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = async function(req, res){

    const URL = "https://www.google.com/search?q=Taj West End, Bengaluru&ahotel_dates=2018-07-25%2C2#ahotel_dates=2018-07-25,2";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);


    const divLenght = await page.$eval('div[data-async-type="updateHotelBookingModule"]', divs => divs.innerHTML);
    const $ = cheerio.load(divLenght);

    const hotelList = $('a[data-dp]');

    const hotelDetails = Object.keys(hotelList).reduce((acc, key) => {
      const elementIndex = parseInt(key);
      if(elementIndex == key) {
        const hotelSpan = $(`a[data-dp]>img`);
        const hotel = hotelList[key];
        acc.push({
          price: hotel.attribs['data-dp'],
          url: hotel.attribs['href'],
          name: hotelSpan[key].attribs.alt
        });
      }
      return acc;

    }, []);
    res.send(hotelDetails);
// await page.screenshot({path: 'example.png'});
    //console.log(divLenght);
    await browser.close();
};

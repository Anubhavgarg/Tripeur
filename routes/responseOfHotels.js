'use strict';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


module.exports = async function(req, res){
  const requestBody = req.body;
  const {hotelName,checkInDate,duration} = requestBody;

  const url = `https://www.google.com/search?q=${hotelName}&ahotel_dates=${checkInDate}%2C${duration}#ahotel_dates=${checkInDate},${duration}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let divlength = '';
  try {
    divlength = await page.$eval('div[data-async-type="updateHotelBookingModule"]', divs => divs.innerHTML);
    const $ = cheerio.load(divlength);
    const hotelList = $('a[data-dp]');
    const hotelDetails = Object.keys(hotelList).reduce((acc, key) => {
      const elementIndex = parseInt(key);
      if(elementIndex == key) {
        const hotelSpan = $(`a[data-dp]>img`);
        const hotel = hotelList[key];
        acc.push({
          id: key,
          price: hotel.attribs['data-dp'],
          siteURL: hotel.attribs['href'],
          siteName: hotelSpan[key].attribs.alt
        });
      }
      return acc;
    }, []);
    res.send(hotelDetails);
  } catch (e) {
    res.send({data:"Please provide correct params"});
  }
  await browser.close();
};

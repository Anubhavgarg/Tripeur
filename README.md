# hotelPrice
 - Do the followng commands in line on linux terminal
    - npm install
    - node index.js
  
 On termial it will show "app running on port. 3000
"

# Open the Postman
   - Select post method to hit the api.
   - Use URL: 
      - "http://localhost:3000/outputData"
   - In body of postman:
      - choose raw data and choose JSON(application/json) as content type.
   
   - For eg Input should be like:
      - {
        	"hotelName": "Taj West End, Bengaluru",
         "checkInDate": "2018-07-25",
         "duration": "2"
        }
        
        
 # Hit the api and internet should be in working state. You will get the output of that api.
 
 # Methodology
   - I have used cheerio and puppeteer npm module to scrap the hotel prices from the link.
   - First of all I have used puppeteer which will launch  url in the browser and get the html of that page.
   - Cheerio is used because we have load the html in cheerio and we can work on the html like we do work in jquery.
   - Now just I have get the data from the browser based on the class and get the data which we want to show in the response.
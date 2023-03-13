# Road Trip Visualiser
This project started with me planning to go on a road trip to the west coast of America, the 
idea was that we wanted to do the classic round trip where we go from Los Angels through 
the Grand Canyon, some of the national parks and then finally end up in San Fransisco where 
we would fly back to Amsterdam. I think that this trip changed about 500 times if it wasn't 
more as every option had it's upsides and it's downsides. 

Google offers this tool called [MyMaps](https://www.google.com/maps/d/u/0/?hl=nl) that 
allows you to create your own custom maps and layers but this felt super clunky and meant 
we had to maintain two sources as our base for planning the road trip was Google Sheets.

So then I thought: "Why not do it myself? 🤔" 

And so this project was born. 💪

![Alt text](/screenshots/screenshot.webp?raw=true "Main page of the visualizer")

![Alt text](/screenshots/screenshot-2.webp?raw=true "Detail view of the visualizer")


## Getting started
This project relies on the following technologies so please make sure to you are able to get API keys for all of them before investing time in setting this up.

- Google Sheets 
- Google Maps (This requires a creditcard)

## Setting up the Sheet
The project uses Google Sheet as the source, you can find the template that I used here, make sure to create a copy so 
you can start adding your own road trip and set the sharing policy to "Everyone with the link"

**[➡️ Google sheet template](https://docs.google.com/spreadsheets/d/1vx0FWu5zmdzHatcLx4ZkxGPp4sdbuDkPIDovCp1lei8/edit?usp=sharing)**

### Base trip configuration
First off you'll have update the `Overview` tab with your departure and return flights, this will generate the stops 
tab that you can fill in next. 

### Fill in your trip information
This is the part that will most likely change many times during the planning of your trip. Make sure to fill in all the 
stops you would like to make during your trip. It will automatically generate the distance and travel time for your 
addresses, so you get a first overview of the distance you'll be travelling.

## Getting the Google Keys
First of all you'll need a Google developer account and go to the console where you'll be creating a new project for your road trips

**[☁️ Google cloud console](https://console.cloud.google.com/)**

### Enable Google Maps
This steps requires you to attach your creditcard to your account, note that the first x amount of requests is still 
free but be aware you do not exceed this limit to avoid unexpected costs.

### Enable Google Sheets
Simply enable Google Sheets Api for your API key.

### Creating a .env file
The next step is to create a .env file with the newly fetched credentials.

```javascript
REACT_APP_GOOGLE_MAPS_API_KEY=[ADD_GOOGLE_MAPS_KEY_HERE]
REACT_APP_SHEET_ID=[ADD_SHEET_ID_HERE]
REACT_APP_TAB_NAME=Stops
REACT_APP_OUTPUT_PATH=./src/asset/
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
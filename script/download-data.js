
require('dotenv').config({debug: true})

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {trimStart, trimEnd} = require('lodash');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const { REACT_APP_TOKEN_PATH, REACT_APP_SHEET_ID, REACT_APP_TAB_NAME, REACT_APP_OUTPUT_PATH } = process.env;

if(!REACT_APP_TOKEN_PATH || !REACT_APP_OUTPUT_PATH || !REACT_APP_SHEET_ID) {
  console.error('Missing environment variables, exitting ')
  process.kill()
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(REACT_APP_TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(REACT_APP_TOKEN_PATH, JSON.stringify(token, null, '  '), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', REACT_APP_TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Load client secrets from a local file and authorize the user
 */
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), parseSheet);
});

/**
 * Parse the sheet and write it to the data file
 *
 * @param auth
 * @returns {Promise<void>}
 */
async function parseSheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  const { data: { values: [_, ...rows] } } = await sheets.spreadsheets.values.get({
    spreadsheetId: REACT_APP_SHEET_ID,
    range: REACT_APP_TAB_NAME,
  })

  // The order of the columns as defined in the sheet, try to find a value for all of the columns
  const keys = [
    'dayNumber',
    'date',
    'morningLocation',
    'afternoonLocation',
    'eveningLocation',
    'distance',
    'time',
    'note'
  ];

  const result = rows.map((row) =>
    keys.reduce((object, key, currentIndex) => ({...object, [key]: row[currentIndex] ?? '' }), {})
  );

  // Write the result to the file that we can read with our application
  fs.writeFile(`${REACT_APP_OUTPUT_PATH}/data.json`, JSON.stringify(result), function(error){
    if (error) {
      console.log('Something went wrong writing the JSON object to a file.');
      return console.log(error);
    }
    console.log('Successfully downloaded the data')
  })
}
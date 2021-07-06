const {
  google
} = require('googleapis');
const fs = require('fs');

const credentials = require('./credentials.json');

const http = require('http');


const express = require('express');

const app = express();

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({
  version: 'v3',
  auth
});
//const sheets = google.sheets({ version: 'v4', auth });

(async function () {

  let res = await drive.files.list({
    pageSize: 20,
    fields: 'files(name,fullFileExtension,webViewLink)',
    orderBy: 'createdTime desc'
  });

  // Create a new spreadsheet
  //   let newSheet = await sheets.spreadsheets.create({
  //     resource: {
  //       properties: {
  //         title: 'Another Day, Another Spreadsheet',
  //       }
  //     }
  //   });

  //   // Move the spreadsheet
  //   const updatedSheet = await drive.files.update({
  //     fileId: newSheet.data.spreadsheetId,
  //     // Add your own file ID:
  //     addParents: '1Kyd0SwMUuDaIhs03XtKG849-d6Ku_hRE',
  //     fields: 'id, parents'
  //   });

  // Transfer ownership
  //   await drive.permissions.create({
  //     fileId: newSheet.data.spreadsheetId,
  //     transferOwnership: 'true',
  //     resource: {
  //      type: 'user',
  //        role: 'owner',
  //       // Add your own email address:
  //       emailAddress: 'andy-gluks@gmail.com'
  //     }
  //   });

  // Add data as new rows
  //let sheetData = [['File Name', 'URL']];

  res.data.files.map(entry => {
    const {
      name,
      webViewLink
    } = entry;
    //sheetData.push([name, webViewLink]);
    console.log(name + '--' + webViewLink);
  });

  //   sheets.spreadsheets.values.append({
  //     spreadsheetId: newSheet.data.spreadsheetId,
  //     valueInputOption: 'USER_ENTERED',
  //     range: 'A1',
  //     resource: {
  //       range: 'A1',
  //       majorDimension: 'ROWS',
  //       values: sheetData,
  //     },
  //   });

  //   // Add styling to the first row
  //   await sheets.spreadsheets.batchUpdate({
  //     spreadsheetId: newSheet.data.spreadsheetId,
  //     resource: {
  //       requests: [
  //         {
  //           repeatCell: {
  //             range: {
  //               startRowIndex: 0,
  //               endRowIndex: 1
  //             },
  //             cell: {
  //               userEnteredFormat: {
  //                 backgroundColor: {
  //                   red: 0.2,
  //                   green: 0.2,
  //                   blue: 0.2
  //                 },
  //                 textFormat: {
  //                   foregroundColor: {
  //                     red: 1,
  //                     green: 1,
  //                     blue: 1
  //                   },
  //                   bold: true,
  //                 }
  //               }
  //             },
  //             fields: 'userEnteredFormat(backgroundColor,textFormat)'
  //           }
  //         },
  //       ]
  //     }
  //   });

  // Back-up data locally
  let data = '<div class="image_list">';

  res.data.files.map(entry => {
    const {
      name,
      webViewLink
    } = entry;
    console.log(entry);
    if (!webViewLink.includes('folders')) {
      const linkArray = webViewLink.split('/');
      const webViewLinkPlus = 'https://drive.google.com/uc?id=' + linkArray[5];
      data += `<div class="image_item" data-link="${webViewLinkPlus}"></div>\n`;
    }
    // data += `<img class="image_image" src="${webViewLinkPlus}"></div>\n`;
  });

  fs.writeFile('data.txt', data, (err) => {
    if (err) throw err;
  });



})()
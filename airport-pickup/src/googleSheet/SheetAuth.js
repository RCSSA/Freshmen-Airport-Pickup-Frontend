import { GoogleSpreadsheet } from "google-spreadsheet";

// // Config variables
// const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
// const SHEET_ID_v = process.env.REACT_APP_SHEET_ID_V;
// const SHEET_ID_s = process.env.REACT_APP_SHEET_ID_S;
// const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
// const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

// export async function loadSheet(){
//     console.log(SPREADSHEET_ID);
//     // Initialize the sheet - doc ID is the long id in the sheets URL
//     const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

//     // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
//     await doc.useServiceAccountAuth({
//     // env var values are copied from service account credentials generated by google
//     // see "Authentication" section in docs for more info
//     client_email: CLIENT_EMAIL,
//     private_key: PRIVATE_KEY,
//     });

//     await doc.loadInfo(); // loads document properties and worksheets
//     console.log(doc.title);
//     // await doc.updateProperties({ title: 'renamed doc' });

//     const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
//     console.log(sheet.title);
//     console.log(sheet.rowCount);
// }



// // adding / removing sheets
// export async function addsheet(){
//     const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
// }

// //remove sheets
// export async function deleteSheet(sheetForDel){
//     await sheetForDel.delete();
// }

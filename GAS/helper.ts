// --------------------
// Types & Objects
// --------------------

/** Example for type of data to manipulate */
interface ExampleData {
  name: string;
  age: number;
  role: string;
}

/**
 * Allows for logging to both Logger and console
 * eg, `CustomLogger.log("here is my message")`
 */
const CustomLogger = {
  log: function (msg: string, ...args: any[]) {
    Logger.log(msg, ...args);
    console.log(msg, ...args);
  },
};

// --------------------
// General Functions
// --------------------

/** Get today's date in MM-DD-YYYY format */
function getTodayString(): string {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return month + "-" + day + "-" + year;
}

// --------------------
// Google Drive
// --------------------

const DriveHelper = {
  /** Get shareable link for PDF */
  getShareableLink: function (file: GFile): string {
    return "http://drive.google.com/uc?export=view&id=" + file.getId();
  },

  /** Add Blob to folder, return File */
  uploadBlobToDrive: function (blob: GBlob, uploadFolderId: string): GFile {
    const file = DriveApp.createFile(blob);
    const folder = DriveApp.getFolderById(uploadFolderId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    return file;
  },
};

// --------------------
// Google Sheets
// --------------------

const SheetsHelper = {
  /** Return sheet with given ID. */
  getSheetById: function (SS: SS, id: number): Sheet {
    return SS.getSheets().filter((s) => s.getSheetId() === id)[0];
  },

  /** Get list of all sheet names */
  getSheetNames: function (): string[] {
    const sheets = SpreadsheetApp.getActive().getSheets();
    return sheets.map((sheet) => sheet.getName());
  },

  /** Write the data object to the next row in sheet */
  writeData: function (sheet: Sheet, data: ExampleData) {
    const nextRow = sheet.getDataRange().getHeight() + 1;
    const fillData = [data.age, data.name, data.role];
    const range = sheet.getRange(nextRow, 1, 1, fillData.length);
    range.setValues([fillData]);
  },

  /** Convert spreadsheet data (array of arrays) into array of objects []{} */
  parseSpreadsheetData: function (data: any[][]): object[] {
    // Take first row as headers
    const headers = <string[]>data.shift();
    // convert [][] -> []{}  (headers as key)
    return data.map((row) => {
      const res = {};
      for (let i = 0; i < headers.length; i++) {
        res[headers[i]] = row[i];
      }
      return res;
    });
  },

  /** Create PDF Blob for given Google Sheet */
  getPdfBlob: function (
    sheet: Sheet,
    pdfName: string,
    addDateToName: boolean
  ): GBlob {
    // prepare export URL
    const ssId = sheet.getParent().getId();
    const sheetId = sheet.getSheetId();
    const url = `https://docs.google.com/spreadsheets/d/${ssId}/export?`;
    const url_ext =
      "exportFormat=pdf&format=pdf" + // export as pdf / csv / xls / xlsx
      "&size=letter" + // paper size legal / letter / A4
      "&portrait=true" + // orientation, false for landscape
      "&fitw=true&source=labnol" + // fit to page width, false for actual size
      "&sheetnames=false&printtitle=false" + // hide optional headers and footers
      "&pagenumbers=true&gridlines=false" + // hide page numbers and gridlines
      "&fzr=false" + // repeat row headers (frozen rows) on each page
      "&gid="; // the sheet's Id
    const token = ScriptApp.getOAuthToken();
    const response = UrlFetchApp.fetch(url + url_ext + sheetId, {
      headers: { Authorization: "Bearer " + token },
    });
    if (addDateToName) pdfName = `${pdfName} - ${getTodayString()}`;
    return response.getBlob().setName(pdfName + ".pdf");
  },
};

// --------------------
// Gmail
// --------------------

const GmailHelper = {
  /** Send PDF */
  sendLink: function (shareableLink: string, email: string, subject: string) {
    const body = _getHtmlBody(shareableLink);
    GmailApp.sendEmail(email, subject, body, {
      htmlBody: body,
      attachments: [],
    });
  },
};

/** Evalulate HTML email template with data */
function _getHtmlBody(pdfLink: string): string {
  const t = HtmlService.createTemplateFromFile("email");
  t["pdfLink"] = pdfLink;
  return t.evaluate().getContent();
}

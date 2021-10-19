type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
type SS = GoogleAppsScript.Spreadsheet.Spreadsheet;
type GFile = GoogleAppsScript.Drive.File;
type GBlob = GoogleAppsScript.Base.Blob;

interface Conf {
  templateSpreadsheetId: string;
  jobCostingFolderId: string;
  dataSheets: string[];
  mods: string[];
}

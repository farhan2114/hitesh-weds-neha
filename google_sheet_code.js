/**
 * =========================================================================
 * Google Apps Script for Hitesh & Neha Wedding RSVP
 * =========================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet (e.g. 'Hitesh & Neha Wedding RSVPs')
 * 2. Click: Extensions -> Apps Script
 * 3. Replace all code in the script editor with this file
 * 4. Click: Save (Ctrl+S or disk icon)
 * 5. Click: Deploy -> New deployment
 * 6. Choose: Select type -> Web app
 * 7. Set Description: 'Wedding RSVP Webhook'
 * 8. Set Execute as: 'Me (your email)'
 * 9. Set Who has access: 'Anyone'   <-- VERY IMPORTANT!
 * 10. Click 'Deploy' -> Authorize access
 * 11. Copy the 'Web app URL' (ends in /exec)
 * 12. Paste the URL in 'src/wedding.config.ts' under 'googleSheetWebhookUrl'
 * =========================================================================
 */

var RESPONSES_SHEET_NAME = 'RSVP Responses';
var SUMMARY_SHEET_NAME = '📊 Event Totals & Summary';

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup RSVP Responses Sheet
  var respSheet = ss.getSheetByName(RESPONSES_SHEET_NAME);
  if (!respSheet) {
    var sheets = ss.getSheets();
    if (sheets.length === 1 && sheets[0].getName() === 'Sheet1') {
      sheets[0].setName(RESPONSES_SHEET_NAME);
      respSheet = sheets[0];
    } else {
      respSheet = ss.insertSheet(RESPONSES_SHEET_NAME, 0);
    }
  }

  var headers = [
    'Timestamp',
    'Name',
    'Mail ID',
    'Adults',
    'Kids',
    'Total Guests',
    'Haldi',
    'Marriage',
    'Sangeet & Cocktail',
    'Satyanarayana Vratham',
    'Attending Events',
    'Blessings Message',
    'Submission ID'
  ];

  if (respSheet.getLastRow() === 0) {
    respSheet.appendRow(headers);
    var headerRange = respSheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#8B1E3F');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    respSheet.setFrozenRows(1);
    respSheet.setRowHeight(1, 35);
  }

  // 2. Setup / Refresh Summary Sheet
  updateSummarySheet(ss);
}

function updateSummarySheet(ss) {
  var summarySheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (!summarySheet) {
    summarySheet = ss.insertSheet(SUMMARY_SHEET_NAME, 1);
  }

  summarySheet.clear();
  summarySheet.setTabColor('#D4AF37');

  var respSheet = ss.getSheetByName(RESPONSES_SHEET_NAME);
  var lastRow = respSheet ? respSheet.getLastRow() : 1;

  // Header Title
  summarySheet.getRange('A1:D1').merge();
  summarySheet.getRange('A1').setValue('💍 HITESH & NEHA WEDDING — RSVP & EVENT TOTALS DASHBOARD');
  summarySheet.getRange('A1').setBackground('#8B1E3F').setFontColor('#FFFFFF').setFontWeight('bold').setFontSize(13).setHorizontalAlignment('center');
  summarySheet.setRowHeight(1, 38);

  // Overall Stats Table
  summarySheet.getRange('A3:B3').setValues([['Overall Metric', 'Count']]);
  summarySheet.getRange('A3:B3').setBackground('#D4AF37').setFontColor('#FFFFFF').setFontWeight('bold');

  if (lastRow > 1) {
    summarySheet.getRange('A4:B7').setValues([
      ['Total RSVP Entries', "=COUNTA('" + RESPONSES_SHEET_NAME + "'!B2:B" + lastRow + ")"],
      ['Total Adults Attending', "=SUM('" + RESPONSES_SHEET_NAME + "'!D2:D" + lastRow + ")"],
      ['Total Kids Attending', "=SUM('" + RESPONSES_SHEET_NAME + "'!E2:E" + lastRow + ")"],
      ['Total Guests (Adults + Kids)', "=SUM('" + RESPONSES_SHEET_NAME + "'!F2:F" + lastRow + ")"]
    ]);
  } else {
    summarySheet.getRange('A4:B7').setValues([
      ['Total RSVP Entries', 0],
      ['Total Adults Attending', 0],
      ['Total Kids Attending', 0],
      ['Total Guests (Adults + Kids)', 0]
    ]);
  }

  // Event Breakdown Table
  summarySheet.getRange('A9:D9').setValues([['Celebration Event', 'Date & Time', 'Parties Attending (RSVPs)', 'Total Guests Attending']]);
  summarySheet.getRange('A9:D9').setBackground('#8B1E3F').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');

  if (lastRow > 1) {
    summarySheet.getRange('A10:D13').setValues([
      [
        'Haldi Ceremony',
        'Friday, 18 Dec • Morning',
        "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!G2:G" + lastRow + ', "Yes")',
        "=SUMIF('" + RESPONSES_SHEET_NAME + "'!G2:G" + lastRow + ', "Yes", \'' + RESPONSES_SHEET_NAME + "'!F2:F" + lastRow + ')'
      ],
      [
        'Marriage (Wedding)',
        'Friday, 18 Dec • 7:05 PM',
        "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!H2:H" + lastRow + ', "Yes")',
        "=SUMIF('" + RESPONSES_SHEET_NAME + "'!H2:H" + lastRow + ', "Yes", \'' + RESPONSES_SHEET_NAME + "'!F2:F" + lastRow + ')'
      ],
      [
        'Sangeet & Cocktail',
        'Saturday, 19 Dec • 6:00 PM',
        "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!I2:I" + lastRow + ', "Yes")',
        "=SUMIF('" + RESPONSES_SHEET_NAME + "'!I2:I" + lastRow + ', "Yes", \'' + RESPONSES_SHEET_NAME + "'!F2:F" + lastRow + ')'
      ],
      [
        'Satyanarayana Vratham',
        'Sunday, 20 Dec • 11:00 AM',
        "=COUNTIF('" + RESPONSES_SHEET_NAME + "'!J2:J" + lastRow + ', "Yes")',
        "=SUMIF('" + RESPONSES_SHEET_NAME + "'!J2:J" + lastRow + ', "Yes", \'' + RESPONSES_SHEET_NAME + "'!F2:F" + lastRow + ')'
      ]
    ]);
  } else {
    summarySheet.getRange('A10:D13').setValues([
      ['Haldi Ceremony', 'Friday, 18 Dec • Morning', 0, 0],
      ['Marriage (Wedding)', 'Friday, 18 Dec • 7:05 PM', 0, 0],
      ['Sangeet & Cocktail', 'Saturday, 19 Dec • 6:00 PM', 0, 0],
      ['Satyanarayana Vratham', 'Sunday, 20 Dec • 11:00 AM', 0, 0]
    ]);
  }

  summarySheet.getRange('B4:B7').setHorizontalAlignment('center').setFontWeight('bold');
  summarySheet.getRange('C10:D13').setHorizontalAlignment('center').setFontWeight('bold');
  summarySheet.autoResizeColumns(1, 4);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    setupSheets();

    var respSheet = ss.getSheetByName(RESPONSES_SHEET_NAME);
    if (!respSheet) {
      respSheet = ss.getSheets()[0];
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = new Date().toLocaleString();
    var name = (data.name || '').trim();
    var email = (data.email || data.contact || '').trim();
    var adults = data.adults !== undefined ? Number(data.adults) : 1;
    var kids = data.kids !== undefined ? Number(data.kids) : 0;
    var guestCount = data.guest_count !== undefined ? Number(data.guest_count) : (adults + kids);
    var haldi = data.haldi === 'Yes' ? 'Yes' : 'No';
    var marriage = data.marriage === 'Yes' ? 'Yes' : 'No';
    var sangeet = data.sangeet === 'Yes' ? 'Yes' : 'No';
    var vratham = data.vratham === 'Yes' ? 'Yes' : 'No';
    var attending = data.attending_events || '';
    var blessings = data.blessings || data.note || '';
    var submissionId = (data.submissionId || '').trim();
    var originalEmail = (data.originalEmail || email).trim();
    var originalName = (data.originalName || name).trim();
    var isUpdateReq = data.isUpdate === true || data.action === 'update';

    var rowValues = [
      now,
      name,
      email,
      adults,
      kids,
      guestCount,
      haldi,
      marriage,
      sangeet,
      vratham,
      attending,
      blessings,
      submissionId
    ];

    // =========================================================================
    // EDIT IN-PLACE LOGIC: Modify existing row instead of adding duplicate row
    // =========================================================================
    var updated = false;
    var targetRowIndex = -1;
    var lastRow = respSheet.getLastRow();

    if (lastRow > 1) {
      var allData = respSheet.getRange(2, 1, lastRow - 1, 13).getValues();

      // Pass 1: Match by unique submissionId (Col M, index 12)
      if (submissionId) {
        for (var i = 0; i < allData.length; i++) {
          var rowSubId = String(allData[i][12] || '').trim();
          if (rowSubId && rowSubId === submissionId) {
            targetRowIndex = i + 2;
            break;
          }
        }
      }

      // Pass 2: Match by email (Col C, index 2)
      if (targetRowIndex === -1 && (originalEmail || email)) {
        var searchEmail = (originalEmail || email).toLowerCase();
        for (var i = 0; i < allData.length; i++) {
          var rowEmail = String(allData[i][2] || '').trim().toLowerCase();
          if (rowEmail && rowEmail === searchEmail) {
            targetRowIndex = i + 2;
            break;
          }
        }
      }

      // Pass 3: Match by name if marked as an update
      if (targetRowIndex === -1 && isUpdateReq && (originalName || name)) {
        var searchName = (originalName || name).toLowerCase();
        for (var i = 0; i < allData.length; i++) {
          var rowName = String(allData[i][1] || '').trim().toLowerCase();
          if (rowName && rowName === searchName) {
            targetRowIndex = i + 2;
            break;
          }
        }
      }

      // If an existing record is found, MODIFY IN-PLACE
      if (targetRowIndex !== -1) {
        var prevTimestamp = respSheet.getRange(targetRowIndex, 1).getValue();
        rowValues[0] = prevTimestamp ? (prevTimestamp + ' (Edited ' + now + ')') : now;
        respSheet.getRange(targetRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
        updated = true;
      }
    }

    // Only append if it is a brand new submission
    if (!updated) {
      respSheet.appendRow(rowValues);
    }

    // Update totals dashboard immediately
    updateSummarySheet(ss);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', updated: updated, row: targetRowIndex }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  setupSheets();
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      message: 'Hitesh & Neha Wedding RSVP Endpoint is online with Event Totals & In-Place Editing.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

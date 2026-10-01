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

var SHEET_NAME = 'Wedding RSVPs';

/**
 * =========================================================================
 * 🧹 ONE-CLICK CLEANUP & FORMAT FUNCTION:
 * Run this function from the toolbar dropdown to immediately clean up
 * any messy overlapping text, preserve all genuine guest RSVPs, and format
 * the entire sheet into a pristine dashboard!
 * =========================================================================
 */
function cleanAndFormatSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  try {
    sheet.setName(SHEET_NAME);
  } catch (err) {}

  // 1. Collect all genuine guest responses
  var realSubmissions = [];
  var lastRow = sheet.getLastRow();
  if (lastRow >= 6) {
    var rawValues = sheet.getRange(6, 1, lastRow - 5, 13).getValues();
    for (var i = 0; i < rawValues.length; i++) {
      var row = rawValues[i];
      var name = String(row[1] || '').trim();
      var email = String(row[2] || '').trim();
      // Keep real submissions (contains email or valid guest name)
      if (email.indexOf('@') !== -1 || (name && name !== 'Celebration Event' && name !== '0' && name !== 'Total Guests (Adults + Kids)')) {
        realSubmissions.push(row);
      }
    }
  }

  // 2. Clear entire sheet content & formatting
  sheet.clear();
  sheet.clearFormats();

  // 3. Row 1: Merged Title Header
  sheet.getRange('A1:M1').merge();
  sheet.getRange('A1').setValue('💍 HITESH & NEHA WEDDING — LIVE RSVP & EVENT TOTALS DASHBOARD');
  sheet.getRange('A1')
    .setBackground('#8B1E3F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(13)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);

  // 4. Row 2: Metric Headers
  var metricHeaders = [
    'Total RSVPs',
    'Total Adults',
    'Total Kids',
    'Total Guests',
    'Haldi Guests',
    'Marriage Guests',
    'Sangeet Guests',
    'Vratham Guests',
    '', '', '', '', ''
  ];
  sheet.getRange(2, 1, 1, 13).setValues([metricHeaders]);
  sheet.getRange('A2:H2')
    .setBackground('#D4AF37')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(2, 28);

  // 5. Row 3: Live Dashboard Formulas
  var formulas = [
    '=COUNTA(B6:B)',
    '=SUM(D6:D)',
    '=SUM(E6:E)',
    '=SUM(F6:F)',
    '=SUMIF(G6:G, "Yes", F6:F)',
    '=SUMIF(H6:H, "Yes", F6:F)',
    '=SUMIF(I6:I, "Yes", F6:F)',
    '=SUMIF(J6:J, "Yes", F6:F)',
    '', '', '', '', ''
  ];
  sheet.getRange(3, 1, 1, 13).setValues([formulas]);
  sheet.getRange('A3:H3')
    .setFontWeight('bold')
    .setFontSize(13)
    .setFontColor('#333333')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBackground('#FFF9E6')
    .setBorder(true, true, true, true, true, true, '#D4AF37', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(3, 32);

  // 6. Row 4: Spacer
  sheet.setRowHeight(4, 14);

  // 7. Row 5: Field Headers
  var fieldHeaders = [
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
    'Attending Events Summary',
    'Blessings / Note',
    'Submission ID'
  ];
  sheet.getRange(5, 1, 1, fieldHeaders.length).setValues([fieldHeaders]);
  sheet.getRange(5, 1, 1, fieldHeaders.length)
    .setBackground('#8B1E3F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(5, 34);

  // 8. Re-insert Clean Guest Submissions
  if (realSubmissions.length > 0) {
    sheet.getRange(6, 1, realSubmissions.length, 13).setValues(realSubmissions);
    sheet.getRange(6, 1, realSubmissions.length, 13).setVerticalAlignment('middle');
    sheet.getRange(6, 4, realSubmissions.length, 7).setHorizontalAlignment('center');
  }

  // Freeze top 5 rows
  sheet.setFrozenRows(5);

  // Set generous column widths
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 140); // Name
  sheet.setColumnWidth(3, 190); // Mail ID
  sheet.setColumnWidth(4, 75);  // Adults
  sheet.setColumnWidth(5, 75);  // Kids
  sheet.setColumnWidth(6, 95);  // Total Guests
  sheet.setColumnWidth(7, 85);  // Haldi
  sheet.setColumnWidth(8, 85);  // Marriage
  sheet.setColumnWidth(9, 145); // Sangeet
  sheet.setColumnWidth(10, 155); // Vratham
  sheet.setColumnWidth(11, 240); // Summary
  sheet.setColumnWidth(12, 260); // Blessings
  sheet.setColumnWidth(13, 130); // ID
}

function setupSheet(sheet) {
  if (!sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
      try {
        sheet.setName(SHEET_NAME);
      } catch (err) {}
    }
  }
  if (!sheet) return;

  if (sheet.getLastRow() < 5) {
    cleanAndFormatSheet();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      var sheets = ss.getSheets();
      if (sheets.length === 1 && sheets[0].getName() === 'Sheet1') {
        sheets[0].setName(SHEET_NAME);
        sheet = sheets[0];
      } else {
        sheet = ss.insertSheet(SHEET_NAME, 0);
      }
    }

    setupSheet(sheet);

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
    // EDIT IN-PLACE LOGIC: Match existing row (Row 6 onwards) and update in place
    // =========================================================================
    var updated = false;
    var targetRowIndex = -1;
    var lastRow = sheet.getLastRow();

    if (lastRow >= 6) {
      var allData = sheet.getRange(6, 1, lastRow - 5, 13).getValues();

      // Pass 1: Match by unique submissionId (Col M, index 12)
      if (submissionId) {
        for (var i = 0; i < allData.length; i++) {
          var rowSubId = String(allData[i][12] || '').trim();
          if (rowSubId && rowSubId === submissionId) {
            targetRowIndex = i + 6;
            break;
          }
        }
      }

      // Pass 2: Match by originalEmail or email (Col C, index 2)
      if (targetRowIndex === -1 && (originalEmail || email)) {
        var searchEmail = (originalEmail || email).toLowerCase();
        for (var i = 0; i < allData.length; i++) {
          var rowEmail = String(allData[i][2] || '').trim().toLowerCase();
          if (rowEmail && rowEmail === searchEmail) {
            targetRowIndex = i + 6;
            break;
          }
        }
      }

      // Pass 3: Match by originalName or name if requested as update
      if (targetRowIndex === -1 && isUpdateReq && (originalName || name)) {
        var searchName = (originalName || name).toLowerCase();
        for (var i = 0; i < allData.length; i++) {
          var rowName = String(allData[i][1] || '').trim().toLowerCase();
          if (rowName && rowName === searchName) {
            targetRowIndex = i + 6;
            break;
          }
        }
      }

      // If an existing row was matched, MODIFY IT IN PLACE!
      if (targetRowIndex !== -1) {
        var prevTimestamp = sheet.getRange(targetRowIndex, 1).getValue();
        rowValues[0] = prevTimestamp ? (prevTimestamp + ' (Edited ' + now + ')') : now;
        sheet.getRange(targetRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
        updated = true;
      }
    }

    // If brand new entry, append to sheet
    if (!updated) {
      sheet.appendRow(rowValues);
    }

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
  var sheetNames = ss.getSheets().map(function(s) { return s.getName(); });
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  setupSheet(sheet);
  
  var lastRow = sheet.getLastRow();
  var sampleRows = [];
  if (lastRow >= 6) {
    sampleRows = sheet.getRange(Math.max(6, lastRow - 3), 1, Math.min(4, lastRow - 5), 13).getValues();
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      activeSheet: sheet.getName(),
      allSheets: sheetNames,
      totalRows: lastRow,
      recentEntries: sampleRows
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

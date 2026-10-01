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

function setupSheet(sheet) {
  if (!sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      var sheets = ss.getSheets();
      if (sheets.length === 1 && sheets[0].getName() === 'Sheet1') {
        sheets[0].setName(SHEET_NAME);
        sheet = sheets[0];
      } else {
        sheet = ss.getActiveSheet();
      }
    }
  }
  if (!sheet) return;

  if (sheet.getLastRow() === 0) {
    // 1. Dashboard Title (Row 1)
    sheet.getRange('A1:M1').merge();
    sheet.getRange('A1').setValue('💍 HITESH & NEHA WEDDING — LIVE RSVP & EVENT TOTALS DASHBOARD');
    sheet.getRange('A1').setBackground('#8B1E3F').setFontColor('#FFFFFF').setFontWeight('bold').setFontSize(13).setHorizontalAlignment('center');
    sheet.setRowHeight(1, 36);

    // 2. Dashboard Metric Labels (Row 2)
    var metricHeaders = [
      'Total RSVPs',
      'Total Adults',
      'Total Kids',
      'Total Guests',
      'Haldi Guests',
      'Marriage Guests',
      'Sangeet Guests',
      'Vratham Guests',
      '',
      '',
      '',
      '',
      ''
    ];
    sheet.getRange(2, 1, 1, 13).setValues([metricHeaders]);
    sheet.getRange('A2:H2').setBackground('#D4AF37').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');
    sheet.setRowHeight(2, 28);

    // 3. Live Dashboard Formulas (Row 3)
    var formulas = [
      '=IF(COUNTA(B6:B)=0, 0, COUNTA(B6:B))',
      '=IF(COUNTA(B6:B)=0, 0, SUM(D6:D))',
      '=IF(COUNTA(B6:B)=0, 0, SUM(E6:E))',
      '=IF(COUNTA(B6:B)=0, 0, SUM(F6:F))',
      '=IF(COUNTA(B6:B)=0, 0, SUMIF(G6:G, "Yes", F6:F))',
      '=IF(COUNTA(B6:B)=0, 0, SUMIF(H6:H, "Yes", F6:F))',
      '=IF(COUNTA(B6:B)=0, 0, SUMIF(I6:I, "Yes", F6:F))',
      '=IF(COUNTA(B6:B)=0, 0, SUMIF(J6:J, "Yes", F6:F))',
      '',
      '',
      '',
      '',
      ''
    ];
    sheet.getRange(3, 1, 1, 13).setValues([formulas]);
    sheet.getRange('A3:H3').setFontWeight('bold').setFontSize(12).setHorizontalAlignment('center').setBackground('#FFF9E6');
    sheet.setRowHeight(3, 30);

    // 4. Blank divider (Row 4)
    sheet.setRowHeight(4, 15);

    // 5. All Guest Response Fields Header (Row 5)
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
      .setHorizontalAlignment('center');
    sheet.setRowHeight(5, 34);

    // Freeze top 5 rows so Dashboard and Headers are always visible
    sheet.setFrozenRows(5);
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
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  setupSheet(sheet);
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      message: 'Hitesh & Neha Wedding RSVP Endpoint is online with Unified Dashboard and In-Place Editing.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

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

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
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
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#D4AF37');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupSheet();

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

    var timestamp = data.timestamp || new Date().toLocaleString();
    var name = data.name || '';
    var email = data.email || data.contact || '';
    var adults = data.adults !== undefined ? data.adults : 1;
    var kids = data.kids !== undefined ? data.kids : 0;
    var guestCount = data.guest_count !== undefined ? data.guest_count : (adults + kids);
    var haldi = data.haldi || 'No';
    var marriage = data.marriage || 'No';
    var sangeet = data.sangeet || 'No';
    var vratham = data.vratham || 'No';
    var attending = data.attending_events || '';
    var blessings = data.blessings || data.note || '';
    var submissionId = data.submissionId || '';
    var originalEmail = data.originalEmail || email;

    var rowValues = [
      timestamp,
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

    // Check if updating an existing submission (match by submissionId or email)
    var updated = false;
    var lastRow = sheet.getLastRow();

    if (lastRow > 1 && (submissionId || originalEmail)) {
      var allData = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
      for (var i = 0; i < allData.length; i++) {
        var existingEmail = allData[i][2]; // Col C (Mail ID)
        var existingSubId = allData[i][12]; // Col M (Submission ID)
        
        var isMatch = false;
        if (submissionId && existingSubId && String(existingSubId) === String(submissionId)) {
          isMatch = true;
        } else if (originalEmail && existingEmail && String(existingEmail).toLowerCase() === String(originalEmail).toLowerCase()) {
          isMatch = true;
        }

        if (isMatch) {
          sheet.getRange(i + 2, 1, 1, rowValues.length).setValues([rowValues]);
          updated = true;
          break;
        }
      }
    }

    if (!updated) {
      sheet.appendRow(rowValues);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', updated: updated }))
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
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'Hitesh & Neha Wedding RSVP Endpoint is online.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

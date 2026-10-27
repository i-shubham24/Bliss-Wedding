# Saved enquiries

When a family presses **Send enquiry**:

1. The plan is checked in the browser: a name, a phone number with 10 or more digits, and an email only if they gave one.
2. WhatsApp opens at once with the plan written out.
3. At the same time, the server saves the enquiry (`saveEnquiry` in `src/app/actions.ts`). A family that never presses send in WhatsApp still reaches the studio.
4. If anything was saved, the family sees a reference number.

## Fields saved

- **Family:** name, phone, email (optional), bride's and groom's names (optional), the country the family lives in, and the time zone their browser reports.
- **Plan:** occasion, functions, guests, season or exact date, rough budget band, and city.
- **Delivery:** the full WhatsApp message, the page it came from, a reference, and the time received (India time).

A hidden field catches bots: anything typed there is accepted and thrown away.

## Where enquiries go

Set these in `.env.local` for development, or in the hosting dashboard for production. All are optional. See `.env.example`.

| Variable | What it does |
|---|---|
| `ENQUIRY_SHEET_URL` | Adds each enquiry as a row in a Google Sheet (set-up below) |
| `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` | Emails the studio each enquiry. If the family gave an email, it also sends them a confirmation with their reference |

With none set, enquiries are written to the server log only. WhatsApp still opens as before.

## Google Sheet set-up (about five minutes)

1. Create a sheet called **Enquiries** with this header row:
   `ref, received, name, phone, email, bride, groom, country, timeZone, occasion, functions, guests, when, date, budget, city, message, page`
2. In the sheet, open **Extensions > Apps Script**, replace the code with the script below, and save.
3. Click **Deploy > New deployment**, choose **Web app**, set **Execute as: Me** and **Who has access: Anyone**, then deploy.
4. Copy the web app URL into `ENQUIRY_SHEET_URL`.

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActive().getSheetByName("Enquiries");
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(header.map((key) => (Array.isArray(data[key]) ? data[key].join(", ") : data[key] ?? "")));
  return ContentService.createTextOutput("ok");
}
```

## Email set-up

1. Create a Resend account and verify the studio's domain.
2. Set `RESEND_API_KEY`.
3. Set `ENQUIRY_TO`, the inbox that receives enquiries.
4. Set `ENQUIRY_FROM`, a sender on the verified domain, for example `The Bliss <hello@yourdomain.in>`.

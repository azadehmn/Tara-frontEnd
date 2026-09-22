import type { MessageTree } from '../../types';

/** FAQ Q&A copy (HTML answers) for merchant-panel, merged under `faq.items`. */
export const merchantPanelFaqItemsEn: MessageTree = {
  faq: {
    items: {
      questions: {
        q1: {
          question: 'How can I view purchase and settlement reports?',
          answer:
            '<p>To view reports for customer purchases and settlements, follow these steps in the merchant panel:</p><ul><li><p><b>Settlement report:</b> From the right-hand menu, open <b>Merchant invoices</b>. You can click <b>Search</b> without picking a date range to see settlement days and their details.</p></li><li><p><b>Purchase detail report:</b> From <b>Reports</b>, open <b>Purchase detail report</b>. Select the merchant, set the date range, and search to see transactions in that period.</p></li></ul>',
        },
        q2: {
          question: 'How are merchant settlements processed?',
          answer:
            '<p>Settlements follow the <b>terms in your contract with Tara</b>. After final sales are identified, settlement is made on the agreed schedule.</p>',
        },
        q3: {
          question: 'Why is the sales amount different from the settlement amount?',
          answer:
            '<p>This difference is expected:</p><ul><li>The settlement amount is calculated after <b>Tara service fees</b> are deducted.</li><li>The <b>service fee</b> is also subject to <b>VAT</b>.</li><li>The amount payable to you is: <b>sales amount − (Tara fee + its tax) = final settlement</b></li></ul>',
        },
        q4: {
          question: 'What should I do if the store POS does not close at the time of purchase?',
          answer:
            '<p>Most POS software includes an inquiry service. If the till does not close, share the purchase details with the merchant supervisor so it can be checked in the finance panel and, if needed, resolved (for example by cancel or return so the purchase is registered on the POS).</p>',
        },
        q5: {
          question: 'What is mixed payment in a store?',
          answer:
            '<p>Paying with two micro-credit cards on one in-store invoice is not supported.</p><table><tr><td>Mixed payment online</td><td>The user pays part of the amount from a Tara wallet (such as micro-credit, voucher, or groceries) and the rest from the cash wallet.</td></tr><tr><td>Mixed payment in-store</td><td>The user can pay with two or more Tara wallets, as long as the selected card can be used at that store.</td></tr></table>',
        },
        q6: {
          question: 'How can I recognize Tara payment errors?',
          answer:
            '<p>Tara errors are 5 digits, start with 8, and include a Persian description. If you see another format, follow up with the store IT team.</p><ul><li><b>Store information has expired:</b> Check the store contract status with Tara.</li><li><b>Barcode has expired:</b> Tara barcodes refresh every 30 seconds and remain usable for up to 3 minutes. Ask the user to show a new barcode.</li><li><b>84046 — barcode information is invalid:</b> The user’s phone date and time must be set to automatic.</li><li><b>Daily transaction limit exceeded:</b> The user’s daily purchase cap at your store has been reached.</li><li><b>This card cannot be used at this store:</b> Some cards work only at specific stores. The user can choose another card or filter eligible stores in the Tara app.</li></ul>',
        },
        q7: {
          question:
            'What should the seller do if credit is deducted but no invoice is issued?',
          answer:
            '<p>This usually happens because the purchase was not finalized on the POS. The user can check the transaction status in the Tara app. If it is pending or failed, the amount is refunded. If it succeeded and the POS supports Tara inquiry, enter the reference number in inquiry so the invoice is issued.</p>',
        },
        q8: {
          question:
            'What are the merchant finance panel, sales panel, and gateway passwords?',
          answer:
            '<p>The finance panel password is sent by SMS to the merchant’s registered number. Sales panel and gateway passwords are provided by Tara technical support. All passwords are case-sensitive, and each system has its own password.</p>',
        },
        q9: {
          question: 'Why can I not sign in to the merchant panel?',
          answer:
            '<p>This can be due to incorrect credentials or a blocked account. To unblock, contact merchant support on WhatsApp.</p>',
        },
        q10: {
          question: 'How can a merchant advertise on Tara?',
          answer:
            '<p>To learn how merchant advertising on Tara works, contact merchant support on WhatsApp.</p>',
        },
        q11: {
          question: 'Why was the merchant panel blocked?',
          answer:
            '<p>Blocking is usually caused by repeated incorrect password attempts, or the merchant requested the account to be blocked. Contact merchant support on WhatsApp to unblock.</p>',
        },
        q12: {
          question: 'How can a merchant unblock their account?',
          answer:
            '<p>If you forgot the sales or finance panel password and the account is blocked, contact your Tara merchant account manager.</p>',
        },
        q13: {
          question: 'How can I contact merchant support experts?',
          answer:
            '<p>Call merchant support at <b>1573, ext. 4</b>.</p>',
        },
        q14: {
          question:
            'What should be done if branches change (closed or new branches)?',
          answer:
            '<p>If a branch is closed, inform merchant support on WhatsApp.</p><p>If you add an in-store branch, fill in the new branch details in the Excel format and send it on merchant WhatsApp.</p>',
        },
        q15: {
          question:
            'What should be done if the contract type changes (legal to individual or vice versa)?',
          answer:
            '<p>Notify merchant support on WhatsApp.</p>',
        },
        q16: {
          question:
            'What should be done if I see the error “this account cannot purchase from this store”?',
          answer:
            '<p>Some cards can only be used at specific stores. Another card must be used to complete the purchase.</p>',
        },
      },
      videos: {
        v1: {
          question: 'Where can I watch merchant panel training videos?',
          answer:
            '<p>Short panel training videos are collected in this section: signing in, viewing purchase reports, tracking settlements, and sending a ticket. Pick the topic you need from the list.</p>',
        },
        v2: {
          question: 'How do I find the purchase detail report using a video?',
          answer:
            '<p>The reports video shows how to open <b>Purchase detail report</b> from <b>Reports</b>, select the merchant and date range, and search to see transactions.</p>',
        },
        v3: {
          question: 'What does the settlement and invoice video cover?',
          answer:
            '<p>The settlement video explains the <b>Merchant invoices</b> path and the Search button so you can see settlement days and each row’s details.</p>',
        },
        v4: {
          question: 'What does the mixed-payment training video cover?',
          answer:
            '<p>The mixed-payment video shows that online, part of the amount is paid from a Tara wallet and the rest from the cash wallet. In-store, several wallets can be combined if the card is allowed at that store.</p>',
        },
        v5: {
          question: 'What does the Tara payment-errors video cover?',
          answer:
            '<p>Tara errors are five digits and start with 8. The video covers examples such as expired barcode, expired store information, and a card that cannot be used at the store, plus what the cashier should do.</p>',
        },
      },
      support: {
        s1: {
          question: 'What is the merchant support phone number?',
          answer:
            '<p>Call merchant support at <b>1573, ext. 4</b>.</p>',
        },
        s2: {
          question: 'How do I use support WhatsApp?',
          answer:
            '<p>Send your request with the store name and merchant ID to merchant support on WhatsApp so blocking, branch, or advertising issues can be reviewed faster.</p>',
        },
        s3: {
          question: 'When should I send a new ticket?',
          answer:
            '<p>If you cannot find the answer in the FAQ or need a case-specific follow-up, send a new request from the ticket link at the bottom of this page.</p>',
        },
      },
    },
  },
};

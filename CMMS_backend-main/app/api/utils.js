
const nodemailer = require("nodemailer");
const sendgridtransport = require("nodemailer-sendgrid-transport");
const fs = require("fs");
const path = require('path');
module.exports={
    sendEmail : async (to, subject, content) => {
        try {
            const transport = nodemailer.createTransport(
                sendgridtransport({
                    auth: {
                        api_key:
                            "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"
                    }
                })
            );
            const email = {
                from: 'support@seafairmiami.com',
                to,
                subject:"Seafairmiami Notification",
                html: content
            };
         
            console.log(email);
            await transport.sendMail(email);
            return { ok: true, message: "success" };
        } catch (e) {
            console.log("email exception:", e.toString());
            return { ok: false, message: e.toString() };
        }
    },
    sendEmailByPDF: async (to, comment, filepath) => {

        // var pdfPath = "../../public/upload/WO-873.pdf";
        // var pdfPath = `${__dirname}/../../public/upload/WO-873.pdf`;
        // var pdfPath = path.join(__dirname, '../../public/upload/WO-873.pdf');
        var pdfPath = path.join(__dirname, '../../' + filepath);
        console.log(pdfPath);       
        // attachment = fs.readFileSync(pdfPath).toString("base64");
        try {
            const transport = nodemailer.createTransport(
                sendgridtransport({
                    auth: {
                        api_key:
                            "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"
                    }
                })
            );
            const email = {
                from: 'support@seafairmiami.com',
                to,
                subject: "Seafairmiami Notification",
                text: comment==''?"It's the purchase order PDF":comment,
                attachments: [{
                    filename: 'purchaseOrder.pdf',
                    path: pdfPath,
                    contentType: 'application/pdf'
                }],               
            };

            // console.log(email);
            await transport.sendMail(email);
            return { ok: true, message: "success" };
        } catch (e) {
            console.log("email exception:", e.toString());
            return { ok: false, message: e.toString() };
        }
    },
}
 




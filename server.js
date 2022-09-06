
const express = require('express');
const path = require('path');
const ejs = require('ejs');
var pdf = require('html-pdf');
var nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'talhachadhar720@gmail.com',
        pass: 'ioznqsyvkgpajhzw'
    }
});

var mailOptions = {
    from: 'talhachadhar720@gmail.com',
    to: 'talhaaslam72@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

function pfdConverter(info) {
    var config = { format: 'A4', printBackground: true };
                pdf.create(info, config).toFile('pdf/generated.pdf', function (err, res) {
                    if (err) return console.log(err);
                    mailOptions.attachments = [{ filename: 'generated.pdf', path: 'pdf/generated.pdf' }]
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
}

app.get('/', async (req, res) => {

    let type = 'quotation';
    const deviceQuotationRequestor = {
        firstName: 'Afif',
        lastName: 'Jazmin',
        userEmail: 'jazmin@gmail.com',
        userType: 'Driver Ambulance',
        hospital: 'Ikram Hospital',
        street: 'gulshan Colony street #03',
        city: 'gujrat',
        state: 'punjab',
        postalCode: '50700',
        country: 'pakistan',
        phone: '98765456789',
        serviceType: 'Breakdown Device',
        quotationId: 'MYA/2021/QR01',
        ref: 'MYA/SERV/21134-W',
        supplier: 'Mnz Enterprise',
        date: '21/09/2022',
        problemList: [
            {
                id: 1,
                desc: 'Sparetor replacement - Vantilator'
            }
        ]
    }

    const quotation = {
        firstName: 'Afif',
        lastName: 'Jazmin',
        userEmail: 'jazmin@gmail.com',
        userType: 'Driver Ambulance',
        hospital: 'Ikram Hospital',
        street: 'gulshan Colony street #03',
        city: 'gujrat',
        state: 'punjab',
        postalCode: '50700',
        country: 'pakistan',
        phone: '98765456789',
        quotationId: 'MYA/2021/QR01',
        ref: 'MYA/SERV/21134-W',
        supplier: 'Mnz Enterprise',
        date: '21/09/2022',
        validity: '2 WEEKS',
        deliveryTerm: 'D2D',
        paymentTerm: 'PYMNT',
        gross: 180.00,
        discount: 0,
        saleTax: 0,
        totalRM: 180.00,
        terms: '30DAYS',
        doNumber: 'MYA/2021/D01',
        problemList: [
            {
                id: 1,
                desc: 'Sparetor replacement - Vantilator',
                price: 180.00,
                amount: 180.00
            }
        ]
    }

    const onsiteQuotationRequestor = {
        firstName: 'Afif',
        lastName: 'Jazmin',
        userEmail: 'jazmin@gmail.com',
        userType: 'Driver Ambulance',
        hospital: 'Ikram Hospital',
        street: 'gulshan Colony street #03',
        city: 'gujrat',
        state: 'punjab',
        postalCode: '50700',
        country: 'pakistan',
        phone: '98765456789',
        serviceType: 'Breakdown Device',
        quotationId: 'MYA/2021/QR01',
        ref: 'MYA/SERV/21134-W',
        supplier: 'Mnz Enterprise',
        date: '21/09/2022',
        problemList: [
            {
                id: 1,
                desc: 'Sparetor replacement - Vantilator',
                price: 229.00,
                amount: 229.00
            }
        ]
    }

    if( type === 'deviceQuotationRequest' ) {
        res.render('deviceQuotation.ejs', { quotation: deviceQuotationRequestor },
         function (err, info) {
            if (err) {
                console.log(err)
            } 
            else {
                 pfdConverter(info);
            }
        }
        )
    }

    if( type === 'quotation' ) {
        res.render('quotation.ejs', { quotation: quotation },
        function (err, info) {
           if (err) {
               console.log(err)
           } 
           else {
                pfdConverter(info);
           }
       }
        )
    }

    if( type === 'purchaseOrder' ) {
        res.render('purchaseOrder.ejs', { quotation: quotation },
        function (err, info) {
            if (err) {
                console.log(err)
            } 
            else {
                 pfdConverter(info);
            }
        }
        )

    }

    if( type === 'deliveryOrder' ) {
        res.render('deliveryOrder.ejs', { quotation: quotation },
        function (err, info) {
            if (err) {
                console.log(err)
            } 
            else {
                 pfdConverter(info);
            }
        }
        )

    }

    if( type === 'invoice' ) {
        res.render('invoice.ejs', { quotation: quotation },
        function (err, info) {
            if (err) {
                console.log(err)
            } 
            else {
                 pfdConverter(info);
            }
        }
        )

    }

    
    if( type === 'onsiteService' ) {
        res.render('onSiteQuotation.ejs', { quotation: quotation },
        function (err, info) {
            if (err) {
                console.log(err)
            } 
            else {
                 pfdConverter(info);
            }
        }
        )

    }
    


})

app.listen(PORT, err => {
    err ?
        console.log("Error in server setup") :
        console.log("Server listening on Port", PORT)
});
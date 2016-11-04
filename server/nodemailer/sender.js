var fs = require('fs');
var nodemailer = require('nodemailer');

// var mailer = {
//   send: send
// }

var smtpConfig = {
  host: 'mail.kevinpagtakhan.com',
  port: 25,
  secure: false, // use SSL
  auth: {
      user: process.env.SPOT_NODEMAILER_USER,
      pass: process.env.SPOT_NODEMAILER_PASS
  },
  tls: {
      rejectUnauthorized: false
  }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

var send = function(filename, email, subject){
  fs.readFile(__dirname + '/templates/' + filename + '.html', (err, data) => {
    if (err) throw err;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"SPOT" <do-not-reply@spot.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: data.toString() // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
        } else {
          console.log(info);
        }
    });
  });
}

module.exports = send;

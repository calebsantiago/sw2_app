"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
function sendMail(email, firstname, lastname) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'contacta.no.reply@gmail.com',
            pass: 'contactasw2ulima'
        }
    });
    var mailOptions = {
        from: 'contacta.no.reply@gmail.com',
        to: email,
        subject: 'Contacta',
        text: 'Hola ' + firstname + ' ' + lastname + ' te damos la bienvenida a Contacta.'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.sendMail = sendMail;
function jsonlength(object) {
    if (object) {
        return Object.keys(object).length;
    }
    else {
        return 0;
    }
}
exports.jsonlength = jsonlength;

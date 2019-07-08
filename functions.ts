import nodemailer from 'nodemailer'
export function sendMail(email : string, firstname: string, lastname : string) : void {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contacta.no.reply@gmail.com',
            pass: 'contactasw2ulima'
        }
    })
    let mailOptions = {
        from: 'contacta.no.reply@gmail.com',
        to: email,
        subject: 'Contacta',
        text: 'Hola ' + firstname + ' ' + lastname + ' te damos la bienvenida a Contacta.'
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Email sent: '+ info.response)
        }
    })
}
export function jsonlength(object : any) : number {
    if (object) {
        return Object.keys(object).length
    }
    else {
        return 0
    }
}
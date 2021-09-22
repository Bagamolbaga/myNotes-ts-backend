import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: 'mynotes.mynotes@yandex.ru',
        pass: '%YuatyTyU13Y'
    }
})

export { transporter };


// host: "smtp.yandex.ru",
// port: 465,
// secure: true,
// auth: {
//     user: 'mynotes.mynotes@yandex.ru',
//     pass: '%YuatyTyU13Y'
// }


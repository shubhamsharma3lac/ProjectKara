module.exports = {
    port: global.process.env.PORT || 3000,
    secret: 'ThisIsDefinatelyNotASecret',
    mongoDb: {
        url: 'mongodb+srv://shubhams:echoecho_12@cluster0-p6esy.mongodb.net/kara?retryWrites=true/'
    }
}
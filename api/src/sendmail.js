const sendMail = async (mailer, params) => {
  return new Promise((resolve, reject) => {
    mailer.sendMail(params, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}

module.exports = sendMail

const generateTemporaryPassword = () => {
  let pass = ''
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1)

    pass += str.charAt(char)
  }

  return pass
}

export default generateTemporaryPassword

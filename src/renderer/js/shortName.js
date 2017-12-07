
function shortName (fullName) {
  return fullName.split(',')[0].split('=')[1]
}

export default shortName

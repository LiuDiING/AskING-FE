
function notify (body) {
  /* eslint-disable no-new */
  new Notification('Argent', {
    body
  })
}

export default notify

import M from 'materialize-css'

const toast = (message) => {
  let toastHTML = '<span className="rounded">' + message + '</span>'
  M.toast({ html: toastHTML, classes: 'rounded green' })
}
export default toast

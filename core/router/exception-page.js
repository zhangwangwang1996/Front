export default {
  exception: {
    code: null,
    message: null,
  },
  throw (code, message) {
    this.exception.code = code
    this.exception.message = message
  },
  cancel () {
    this.exception.code = null
    this.exception.message = null
  },
}

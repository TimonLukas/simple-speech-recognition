export default class DummySpeechRecognition {
  constructor () {
    this.lang = ''
    this.interimResults = false
    this.onerror = () => {}
    this.onresult = () => {}
  }

  start () {}

  abort () {}
}

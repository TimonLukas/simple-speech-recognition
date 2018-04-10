export default class SpeechRecognizer {
  constructor (options) {
    const {
      SpeechRecognition,
      timeout,
      resetCallback,
      resultCallback,
      lang,
      interimResults
    } = Object.assign({}, {
      SpeechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition,
      timeout: 1000,
      resetCallback: () => {},
      resultCallback: () => {},
      lang: 'en-US',
      interimResults: true
    }, options)

    this.timeout = timeout
    this.resultCallback = resultCallback
    this.interimResults = interimResults

    this.speechRecognition = new SpeechRecognition()
    this.speechRecognition.lang = lang
    this.speechRecognition.interimResults = true

    this.speechRecognition.onerror = resetCallback
  }

  start () {
    this.speechRecognition.abort()
    this.speechRecognition.start()

    let timeout = -1

    this.speechRecognition.onresult = (result) => {
      const {transcript} = result.results[0][0]
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        this.speechRecognition.abort()
        this.resultCallback({
          transcript,
          finished: true
        })
      }, this.timeout)

      if (this.interimResults) {
        this.resultCallback({
          transcript,
          finished: false
        })
      }
    }
  }

  abort () {
    this.speechRecognition.abort()
  }
}

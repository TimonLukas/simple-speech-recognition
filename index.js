import DummySpeechRecognition from './DummySpeechRecognition'

export default class SpeechRecognizer {
  /**
   * @param options All the options you want to supply
   * @param options.SpeechRecognition The SpeechRecognition constructor you want to use. Defaults to window.SpeechRecognition or, if not available, window.webkitSpeechRecognition.
   * @param options.timeout Timeout until a given speech recognition is completed (time after the user spoke his last word).
   * @param options.resetCallback This is called when any kind of error happens. If this happens, just reset your UI state, and handle the error.
   * @param options.resultCallback The callback which receives results. They consist of a { transcript, finished }.
   * @param options.lang The lang the speech recognition object is set to. Go look up your lang code on MDN!
   * @param options.interimResults Whether you want to receive interim results or not.
   */
  constructor (options) {
    const {
      SpeechRecognition,
      timeout,
      resetCallback,
      resultCallback,
      lang,
      interimResults
    } = Object.assign({}, {
      SpeechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition || DummySpeechRecognition,
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

    this.dummy = SpeechRecognition === DummySpeechRecognition
  }

  /**
   * Starts the speech recognition process
   */
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

  /**
   * Aborts any running speech recognition process
   */
  abort () {
    this.speechRecognition.abort()
  }

  /**
   * Returns whether the dummy fallback is used or not
   * @return {boolean}
   */
  isDummy () {
    return this.dummy
  }
}

# simple-speech-recognition
Why make it complicated if it can be simple?
This small library abstracts away all those nitty-gritty details you have to pay attention to when using the
browser-integrated `SpeechRecognition`, and lets you focus on what's important: **your own code**.

## Installation
Install this package using `npm` or `yarn`:
```
npm install simple-speech-recognition
```
```
yarn add simple-speech-recognition
```

## Usage
Import the `SpeechRecognizer` class:
```
import SpeechRecognizer from 'simple-speech-recognition'
```

Create one (or more!) instance from the imported class:
```
const speechRecognizer = new SpeechRecognizer(options)
```

`options` can consist of the following fields:
```
const options = {
    SpeechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition || DummySpeechRecognition,
    timeout: 1000, // The timeout until a speech recognition is completed (after the user has spoken their last word)
    resetCallback, // Callback used whenever an error happens
    resultCallback, // Callback used for results
    lang: 'en-US', // Language set on the Speech Recognition object
    interimResults: true // Whether you want to receive interim results or not
}
```
Simply pass an object with any fields you want to override.

The `resultCallback` receives the following message:
```
{
    transcript: 'Lorem ipsum dolor sit amet', // The recognized words
    finished: false // Whether the received message is the last one in the current recognition cycle
}
```

You won't receive any messages with `finished: false` if you passed `interimResults: false` to the constructor.
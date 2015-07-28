let pages = {
  welcome: {
    source: require('image!app-logo'),
    title: 'Welcome to Meowth!',
    subTitle: 'Meowth is a translation that will record your voice in English and transcript it',
    next: 'howItWorks',
  },
  howItWorks: {
    source: require('image!how-it-works'),
    title: 'How it works ?',
    subTitle: 'Meowth is using APIs related to human languages powered by IBM Watson',
    next: 'poweredBy',
  },
  poweredBy: {
    source: require('image!watson-logo'),
    title: 'Powered by IBM',
    subTitle: 'The Watson Developer Cloud offers a variety of services for building cognitive apps',
    next: 'speechToText',
  },
  speechToText: {
    source: require('image!service-speech-to-text'),
    title: 'Speech To Text',
    subTitle: 'This API takes an audio file as an input and returns a text \n',
    next: null,
  },
  translation: {
    source: require('image!service-translation'),
    title: 'Translation',
    subTitle: 'This API takes a text as an input and returns it in another language \n',
    next: 'textToSpeech',
  },
  textToSpeech: {
    source: require('image!service-text-to-speech'),
    title: 'Text To Speech',
    subTitle: 'This API takes a text as an input and returns an audio file \n',
    next: null,
  },
};

module.exports = pages;
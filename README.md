# web_core_crash

This is an example repo showcasing weird iOS WebView crash on latest`(0.48.3)` version on React Native

### Installation steps
- Clone Repo
- `$ npm i`
- `$ cd ios; pod install; cd ..;`
- `$ react-native start`
- Start up app by opening /ios/WebCore.xcodeproj and running in debug mode

where `$` indicates root directory of project

### Crash repro steps
- Click on any of the two buttons.
- Let the web page load completely for the fist time(this is important).
- Go back by swiping from left to right.
- Repeat by clicking any of the buttons.
- Usually crashes on 2nd or 3rd try

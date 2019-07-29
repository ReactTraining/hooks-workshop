// var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

// var bufferSize = 4096
// let oscillator

// var effect = (function() {
//   var node = audioCtx.createScriptProcessor(bufferSize, 1, 1)
//   node.bits = 8 // between 1 and 16
//   node.normfreq = 0.5 // between 0.0 and 1.0
//   var step = Math.pow(1 / 2, node.bits)
//   var phaser = 0
//   var last = 0
//   node.onaudioprocess = function(e) {
//     var input = e.inputBuffer.getChannelData(0)
//     var output = e.outputBuffer.getChannelData(0)
//     for (var i = 0; i < bufferSize; i++) {
//       phaser += node.normfreq
//       if (phaser >= 1.0) {
//         phaser -= 1.0
//         last = step * Math.floor(input[i] / step + 0.5)
//       }
//       output[i] = last
//     }
//   }
//   return node
// })()

// function playNotes() {
//   oscillator && oscillator.stop && oscillator.stop()
//   oscillator = audioCtx.createOscillator()
//   let gain = audioCtx.createGain()
//   gain.gain.value = 0.25
//   effect.connect(audioCtx.destination)
//   gain.connect(effect)
//   oscillator.type = "square"
//   oscillator.frequency.setValueAtTime(987.77, audioCtx.currentTime) // value in hertz
//   oscillator.connect(gain)
//   oscillator.start(0)

//   let timeout1
//   let timeout2

//   timeout1 = setTimeout(() => {
//     oscillator.stop()

//     oscillator = audioCtx.createOscillator()
//     let gain = audioCtx.createGain()
//     gain.gain.value = 0.25
//     effect.connect(audioCtx.destination)
//     gain.connect(effect)
//     oscillator.type = "square"
//     oscillator.frequency.setValueAtTime(1318.51, audioCtx.currentTime) // value in hertz
//     oscillator.connect(gain)
//     oscillator.start(0)

//     timeout2 = setTimeout(() => {
//       gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25)
//     }, 100)
//   }, 100)

//   return () => {
//     clearTimeout(timeout1)
//     clearTimeout(timeout2)
//   }
// }

// // get rid of lint warning
// export { playNotes }

// export default playNotes
// export default () => {}

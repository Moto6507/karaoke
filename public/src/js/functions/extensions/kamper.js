class Kamper {
    constructor(audio) {
      this.audio = audio
      this.context;
      this.source;
      this.filter;
      this.nodesIsConnected = false
    }
   createDependencies() {
    if(this.context && this.source && this.filter) return;
    this.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)();
    this.source = this.context.createMediaElementSource(this.audio)
    this.filter = this.context.createBiquadFilter()
   }
   connectExternalAudio(audio) {
    this.source = this.context.createMediaElementSource(audio)
    this.audio = audio
   }
   connect() {
    if(this.nodesIsConnected) return;
    this.createDependencies()
    this.filter.connect(this.context.destination)
    this.source.connect(this.filter)
    this.nodesIsConnected = true
  }
}
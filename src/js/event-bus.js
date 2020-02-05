
import Vue from 'Vue'
export default function EventBus() {
  this.eventBus = new Vue()
}

var eventBusProto = EventBus.prototype
// eventBusProto.register = function(type, cb) {
//   var eventBus = this.eventBus
//   if (eventBus) {
//     eventBus.$on(type, function(data) {
//       cb(data)
//     })
//   }
// }

eventBusProto.register = function(type, cb) {
  var eventBus = this.eventBus
  if (eventBus) {
    eventBus.$on(type, function(data) {
      cb(data)
    })
  }
}

eventBusProto.unregister = function(type) {
  var eventBus = this.eventBus
  if (eventBus) {
    eventBus.$off(type)
  }
}

eventBusProto.send = function(type, data) {
  var eventBus = this.eventBus
  if (eventBus) {
    eventBus.$emit(type, data)
  }
}

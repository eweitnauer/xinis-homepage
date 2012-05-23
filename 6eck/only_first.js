OnlyFirst = function(callback) {
  this.called = false;
  this.callback = callback;
  var self = this;
  this.f = function() {
    if (!self.called) {
      self.called = true;
      if (self.callback) self.callback();
    }
  }
}

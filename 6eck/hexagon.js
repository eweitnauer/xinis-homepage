var a = 51 
   ,ah = a*Math.sqrt(3)
   ,gap = a*0.1;

/// positions in hexagon grid
var places = [[1,0], [0,1], [-1,0], [0,0], [3,0], [2,0], [2,1], [3,-1], [3,1], [2,-1], [2,2], [3,-2], [3,2], [2,-2], [2,3]];

/// Gibt die Punkte eines Sechsecks zurueck als "x0,y0 x1,y1 ..."
function hexagon(a, x, y) {
  var w3 = Math.sqrt(3);
  var pts = [[-0.5, -0.5*w3], [0.5, -0.5*w3],
             [1,0], [0.5, 0.5*w3],
             [-0.5, 0.5*w3], [-1,0]];
  for (var i=0; i<6; i++) {
    pts[i][0] = pts[i][0]*a + x;
    pts[i][1] = pts[i][1]*a + y;
  }
  for (var i=0; i<6; i++) pts[i] = pts[i].join(",");
  return pts.join(" ");
}

/// Gibt die Punkte der Content-Area zurueck als "x0,y0 x1,y1 ..."
function content_shape(a, w) {
  var w3 = Math.sqrt(3);
  var pts = [[-1,0], [0.5,1.5*w3], [w-1, 1.5*w3], [w-1,-1.5*w3],[0.5, -1.5*w3]];
  for (var i=0; i<pts.length; i++) {
    pts[i][0] = pts[i][0]*a;
    pts[i][1] = pts[i][1]*a;
  }
  for (var i=0; i<pts.length; i++) pts[i] = pts[i].join(",");
  return pts.join(" ");
}

function transform(scale, dx, dy) {
  return "translate(" + dx + "," + dy + ")" + (scale == 1 ? "" : "scale(" + scale + ")");
}

/// Returns the screen postion of the center of a hexagon being at position i,j.
/// The hexagons are positioned as follows:
/// y: 0   o   o   o   o 
///    0 o   o   o   o   o
///    1   o   o   o   o
///    1 o   o   o   o   o
///  x:  0 1 2 3 4 5 6 7 8
function hexpos(a, ipos) {
  var x = ipos[0]*1.5*a;
  var y = (ipos[1]+0.5*(Math.abs(ipos[0])%2))*Math.sqrt(3)*a;
  return [x, y];
}

/// Moves all "g.hexagon" in the svg to the position according to their d.i.
/// places must be an array of [x,y] arrays and is used to map the d.i values to
/// positions in the hexagon structure.
function position_hexagons(duration, callback) {
  var cb = new OnlyFirst(callback);
  d3.selectAll("svg g.hexagon")
    .transition()
    .duration(duration)
    .attr("transform", function(d) {
      var pos = hexpos(a+gap, places[d.i]);
      return transform(1, pos[0], pos[1]);
    })
    .each('end', cb.f);
}

/// Returns a random permutation of 0...N-1.
function get_permutation(N) {
  var a = Array(N); a[0] = 0;
  for (var i=1; i<N; i++) {
    var p = Math.floor(Math.random()*(i+1));
    a[i] = a[p];
    a[p] = i;
  }
  return a;
}

function randomInt(x0, x1) {
  return Math.floor(x0+Math.random()*(x1-x0));
}

/// Call with svg element as this. Will make the element rotate back and forth
/// between -angle and angle degrees.
function wiggle_element(angle) {
  angle = angle || 2;
  return function() {
    d3.select(this).transition()
        .ease('linear')
        .duration(100)
        .attr("transform", "rotate("+angle+")")
        .each("end", wiggle_element(-angle));
  };
}

/// Call with svg element as this. Will make the element move to random locations
/// in [-dist...dist, -dist...dist].
function float_element(dist) {
  dist = dist || 3;
  return function() {
    d3.select(this).transition()
        .ease("linear")
        .duration(1000+Math.random()*100)
        .attr("transform", transform(1, Math.random()*2*dist-dist, Math.random()*2*dist-dist))
        .each("end", float_element(dist));
  };
}

/// Starts / stops floating and sets d.floating attribute for all ".floating"
/// elements in the svg. When stopping the floating, the elements are moved
/// back to 0,0 in duration ms.
function setFloating(selection, do_float, duration) {
  if (do_float) {
    selection
      .each(function(d) { d.floating = true; })
      .each(float_element());
  } else {
    selection
      .each(function(d) { d.floating = false; })
      .transition()
      .duration(duration)
      .attr("transform", transform(1, 0, 0));
  }
}

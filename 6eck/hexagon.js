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

function transform(scale, dx, dy) {
  return "translate(" + dx + "," + dy + ") scale(" + scale + ")";
}

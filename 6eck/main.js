var svg;

function init() {
  svg = d3.select("div#background").append("svg");
  
  svg.append("polygon")
     .attr("points", hexagon(100, 120, 150))
     .attr("fill", "black")
     .attr("fill-opacity", 0.4)
     .attr("stroke", "black")
     .attr("stroke-width", "6px");
       
  svg.select("polygon")
     .transition()
     .duration(2000)
     .attr("fill", "red")
}

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

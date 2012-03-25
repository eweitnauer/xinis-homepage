var svg;
var a = 70;
var hexes = [{a: a, x: 0, y: 0, label: "Illustrationen"},
             {a: a, x: 1, y: 0, label: "Kunst"},
             {a: a, x: 0, y: 1, label: "Logos"},
             {a: a, x: -1, y: 0, label: "Kataloge"}];

function init() {
  svg = d3.select("div#background").append("svg");
  
  var g = svg.selectAll("g.hexagon")
     .data(hexes).enter()
     .append("g")
     .attr("transform", function(d) {
       var pos = hexpos(d.a, d.x, d.y);
       return transform(1, pos[0], pos[1]);
     })
     .attr("class", "hexagon");
  
  g.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });
  
  g.append("polygon")
   .attr("points", function(d) { return hexagon(d.a, 0, 0); })
   .attr("fill", "black")
   .attr("fill-opacity", 0.4)
   .attr("stroke", "black")
   .attr("stroke-width", "4px");
  
     
//  svg.selectAll("polygon")
//     .transition()
//     .duration(2500)
//     .attr("transform", transform(0.5, 400, 400))
}

function hexpos(a, ix, iy) {
  var x = ix*1.5*(a+0.1*a);
  var y = (iy+0.5*(Math.abs(ix)%2))*Math.sqrt(3)*(a+0.1*a);
  return [x+200, y+200];
}

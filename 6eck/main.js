var svg;
var a_big = 70, a_small = 40;
var hexes = [{a: a_big, x: 0, y: 0, label: "Illustrationen"},
             {a: a_big, x: 1, y: 0, label: "Kunst"},
             {a: a_big, x: 0, y: 1, label: "Logos"},
             {a: a_big, x: -1, y: 0, label: "Kataloge"}];

var t=Date.now();

function init() {
  svg = d3.select("div#background").append("svg");
  
  var g = svg.selectAll("g.hexagon")
     .data(hexes).enter()
     .append("g")
     .attr("transform", function(d) {
       var pos = hexpos(d.a, d.x, d.y);
       return transform(1, pos[0], pos[1]);
     })
     .attr("class", "hexagon")
     .append("g")
     .attr("class", "inner")
     .on("mouseover", function() {d3.select(this).transition().duration(0);})
     .on("mouseout", function() {d3.select(this).each(move())});

  g.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });
  
  g.append("polygon")
   .attr("class", "main")
   .attr("points", function(d) { return hexagon(d.a, 0, 0); })
   .attr("fill", "black")
   .attr("fill-opacity", 0.4)
   .attr("stroke", "black")
   .attr("stroke-width", "4px");
      
//  svg.selectAll("g.inner")
//     .transition()
//     .duration(1000)
//     .attr("transform", transform(1,20,20));

  svg.selectAll("g.inner")
    .each(move());
}

function wiggle(angle) {
  return function() {
    d3.select(this).transition()
        .ease('linear')
        .duration(100)
        .attr("transform", "rotate("+angle+")")
        .each("end", wiggle(-angle));
  };
}  

function move() {
  return function() {
    d3.select(this).transition()
        .ease("linear")
        .duration(500+Math.random()*100)
        .attr("transform", transform(1, Math.random()*6-3, Math.random()*6-3))
        .each("end", move());
  };
}  
     
//  svg.selectAll("polygon")
//     .transition()
//     .duration(2500)
//     .attr("transform", transform(0.5, 400, 400))


function hexpos(a, ix, iy) {
  var x = ix*1.5*(a+0.1*a);
  var y = (iy+0.5*(Math.abs(ix)%2))*Math.sqrt(3)*(a+0.1*a);
  return [x+200, y+200];
}

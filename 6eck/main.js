/* Ablauf:
1. 4 grosse Sechecke in der Mitte (wackeln)
2. bei Click: das geklickte wird markiert, wandert nach oben, alle vier werden
   kleiner und bewegen sich an den linken Rand (wackeln nicht mehr)
3a. bei erneutem Click auf ausgewaehltes: wandern zurueck in die Mitte
3b.                    auf nicht ausgewaehltes: markierung wechselt, 6eck nach oben
*/

var svg;
var a = 70, ah = a*Math.sqrt(3),
    gap = 0.1;
var places = [[1,0], [0,1], [-1,0], [0,0]];
var hexes = [{a: a, place: 0, label: "Illustrationen"},
             {a: a, place: 1, label: "Kunst"},
             {a: a, place: 2, label: "Logos"},
             {a: a, place: 3, label: "Kataloge"}];

var w, h;
var t=Date.now();

function init() {
  w = 1200;
  h = 600;
  svg = d3.select("div#background")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  
  svg.append("g")
    .attr("class", "main");
  move_to_center(0);
    
  var glinks = svg.select("g.main")
    .selectAll("g.hexagon")
    .data(hexes).enter()
    .append("g")
    .attr("class", "hexagon")
    .append("g")
    .attr("class", "inner")
    .on("mouseover", function() {d3.select(this).transition().duration(0);})
    .on("mouseout", function() {d3.select(this).each(move())})
    .on("click", clicked_main);

  position_hexagons(0);
  
  glinks.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });
  
  glinks.append("polygon")
   .attr("class", "main")
   .attr("points", function(d) { return hexagon(d.a, 0, 0); })
   .attr("fill", "black")
   .attr("fill-opacity", 0.4)
   .attr("stroke", "black")
   .attr("stroke-width", "4px");
      
  svg.selectAll("g.inner")
    .each(move());
}

function move_to_center(duration) {
  svg.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(1,w/2,(h-ah-gap*a)/2));
}

function move_to_left(duration) {
  d3.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(0.6, (1.5+gap)*a, (h-ah-gap*a)/2));
}

function position_hexagons(duration) {
  d3.selectAll("g.hexagon")
    .transition()
    .duration(duration)
    .attr("transform", function(d) {
      var pos = hexpos(d.a, places[d.place]);
      return transform(1, pos[0], pos[1]);
    });
}

function clicked_main(d) {
  if (d.selected) {
    d.selected = false;
    move_to_center(1000);
    // update selection class
    d3.selectAll("polygon")
      .attr("class", function(d) { return d.selected ? "selected" : "" });
    return;
  }
  // unselect all hexagons
  for (var i=0; i<hexes.length; i++) {
    hexes[i].selected = false;
  }
  // select current one
  d.selected = true;
  // update selection class
  d3.selectAll("polygon")
    .attr("class", function(d) { return d.selected ? "selected" : "" });
  
  if (d.place != 0) {
    for (var i=0; i<hexes.length; i++) {
      if (hexes[i].place == 0) {
        hexes[i].place = d.place;
        d.place = 0;
        break;
      }
    }
    position_hexagons(1000);
  }
  move_to_left(1000);
  d3.selectAll("g.inner")
    .transition()
    .duration(1000)
    .attr("transform", transform(1, 0, 0));
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

function hexpos(a, ipos) {
  var x = ipos[0]*1.5*(a+gap*a);
  var y = (ipos[1]+0.5*(Math.abs(ipos[0])%2))*Math.sqrt(3)*(a+gap*a);
  return [x, y];
}

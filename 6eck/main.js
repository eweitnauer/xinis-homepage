/* Ablauf:
1. 4 grosse Sechecke in der Mitte (wackeln)
2. bei Click: das geklickte wird markiert, wandert nach rechts, alle vier werden
   kleiner und bewegen sich an den linken Rand (wackeln nicht mehr)
3a. bei erneutem Click auf ausgewaehltes: wandern zurueck in die Mitte
3b.                    auf nicht ausgewaehltes: markierung wechselt, 6eck nach rechts
*/

var svg;
var scaling = 0.8;
var hexes = [{i: 0, label: "Illustrationen", children:
               [{i: 4, label: "I1"}
               ,{i: 5, label: "I2"}
               ,{i: 6, label: "I3"}
               ,{i: 7, label: "I4"}
               ,{i: 8, label: "I5"}
               ,{i: 9, label: "I6"}
               ,{i: 10, label: "I7"}
               ,{i: 11, label: "I8"}
               ,{i: 12, label: "I9"}
               ]
             },
             {i: 1, label: "Kunst", children: []},
             {i: 2, label: "Logos", children: []},
             {i: 3, label: "Kataloge", children: []}];
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
    
  var glinks = svg.select("g.main")
    .selectAll("g.hexagon")
    .data(hexes).enter()
    .append("g")
    .attr("class", "hexagon")
    .append("g")
    .attr("class", "floating")
    .on("mouseover", function() {d3.select(this).transition().duration(0);})
    .on("mouseout", function(d) { if (d.floating) d3.select(this).each(float_element())})
    .on("click", clicked_main);
    
  glinks.append("polygon")
   .attr("class", "main")
   .attr("points", function(d) { return hexagon(a, 0, 0); })
   .attr("fill-opacity", 0.4)
   .attr("stroke", "black")
   .attr("stroke-width", "4px");

  glinks.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });

  move_to_center(0);
  position_hexagons(0, a+gap);
  setFloating(true);
}

function move_to_center(duration) {
  svg.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(1,w/2,(h-ah-gap)/2));
  // start floating
  setFloating(true);
}

function move_to_left(duration) {
  d3.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(scaling, scaling*(3*a+gap), (h-ah-gap)/2));
  // stop floating
  setFloating(false, duration);
}

function clicked_main(d) {
  // was the already selected hexagon clicked?
  if (d.selected) {
    // yes, so deselect it and move all hexagons back to center
    d.selected = false;
    d3.select(this).select("polygon").attr("class", "");
    move_to_center(1000);
    return;
  }
  
  // a new hexagon was clicked!
  // select new one...
  for (var i=0; i<hexes.length; i++) hexes[i].selected = false;
  d.selected = true;
  d3.selectAll("polygon")
    .attr("class", function(d) { return d.selected ? "selected" : "" });
  // set its index to 0...
  if (d.i != 0) {
    for (var i=0; i<hexes.length; i++) {
      if (hexes[i].i == 0) {
        hexes[i].i = d.i;
        d.i = 0;
        break;
      }
    }
    position_hexagons(1000);
  }
  // and move all hexagons to the left
  move_to_left(1000);
  setTimeout(function() { expand_inner_links(d) }, 1000);
}

function expand_inner_links(d) {
  var hs = d3.select("svg g.main").selectAll("g.hexagon")
    .data(hexes.concat(d.children));

  var pos = hexpos(a+gap, places[0]);
  
  var hse = hs.enter()
    .append("g", "g.hexagon")
    .attr("class", "hexagon")
    .attr("transform", transform(1, pos[0], pos[1]))
    .attr("z-index", -100)
    .append("g")
    .attr("class", "floating")
    .on("mouseover", function() {d3.select(this).transition().duration(0);})
    .on("mouseout", function(d) { if (d.floating) d3.select(this).each(float_element())})
//    .on("click", clicked_sub);
  
  hse.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });
  
  hse.append("polygon")
   .attr("class", "main")
   .attr("points", function(d) { return hexagon(a, 0, 0); })
   .attr("fill", "black")
   .attr("fill-opacity", 0.4)
   .attr("stroke", "black")
   .attr("stroke-width", "4px");

  position_hexagons(1000, a+gap);
  
  hs.exit()
    .transition()
    .duration(1000)
    .attr("transform", transform(1, pos[0], pos[1]))
    .remove();
}

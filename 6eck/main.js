/* Ablauf:
1. 4 grosse Sechecke in der Mitte (wackeln)
2. bei Click: das geklickte wird markiert, wandert nach rechts, alle vier werden
   kleiner und bewegen sich an den linken Rand (wackeln nicht mehr)
3a. bei erneutem Click auf ausgewaehltes: wandern zurueck in die Mitte
3b.                    auf nicht ausgewaehltes: markierung wechselt, 6eck nach rechts
*/

var hexes = loadData();
var svg;
var scaling = 0.8;
var w, h;
var t=Date.now();

function init() {
  w = 1200;
  h = 600;
  svg = d3.select("div#background")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  
  init_background();
  
  svg.append("g")
    .attr("class", "main");
    
  var glinks = svg.select("g.main")
    .selectAll("g.hexagon")
    .data(hexes, function(d) { return d.label; })
    .enter()
    .append("g")
    .attr("class", "hexagon")
    .append("g")
    .attr("class", "floating")
    .on("mouseover", function() {d3.select(this).transition().duration(0);})
    .on("mouseout", function(d) { if (d.floating) d3.select(this).each(float_element())})
    .on("click", clicked_main);
    
  glinks.append("polygon")
   .attr("class", "main")
   .attr("points", function(d) { return hexagon(a, 0, 0); });

  glinks.append("text")
   .text(function(d) { return d.label; });

  move_to_center(0);
  position_hexagons(0, a+gap);
  setFloating(d3.selectAll("svg .floating"), false);
}

function move_to_center(duration) {
  svg.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(1,w/2,(h-ah-gap)/2));
  // start floating
  setFloating(d3.selectAll("svg .floating"), false);
}

function move_to_left(duration) {
  d3.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(scaling, scaling*(3*a+gap), (h-ah-gap)/2));
  // stop floating
  setFloating(d3.selectAll("svg .floating"), false, duration);
}

function clicked_main(d) {
  // was the already selected hexagon clicked?
  if (d.selected) {
    // yes, so deselect it and move all hexagons back to center
    update_inner_links();
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
  setTimeout(function() { update_inner_links(d) }, 1000);
}

function update_inner_links(d) {
  var children = d && d.children ? d.children : [];
  var hs = d3.select("svg g.main").selectAll("g.hexagon")
    .data(hexes.concat(children), function(d) {return d.label});

  var pos = hexpos(a+gap, places[0]);
  
  var hse = hs.enter()
    .insert("g", "g.hexagon")
    .attr("class", "hexagon")
    .attr("transform", transform(1, pos[0], pos[1]))
    .append("g")
    .attr("class", "floating")
    .on("mouseover", function() {d3.select(this).transition().duration(0);})
    .on("mouseout", function(d) {if (d.floating) d3.select(this).each(float_element())})
//    .on("click", clicked_sub);

  setFloating(hse, false);
    
  hse.append("polygon")
   .attr("class", "sub")
   .attr("points", function(d) { return hexagon(a, 0, 0); });

  hse.append("text")
   .attr("alignment-baseline", "middle")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.label; });

  position_hexagons(1000, a+gap);
  
  hs.exit()
    .transition()
    .duration(1000)
    .attr("transform", transform(1, pos[0], pos[1]))
    .remove();
}

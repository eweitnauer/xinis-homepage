/* Ablauf:
1. 4 grosse Sechecke in der Mitte (wackeln)
2. bei Click: das geklickte wird markiert, wandert nach rechts, alle vier werden
   kleiner und bewegen sich an den linken Rand (wackeln nicht mehr)
3a. bei erneutem Click auf ausgewaehltes: wandern zurueck in die Mitte
3b.                    auf nicht ausgewaehltes: markierung wechselt, 6eck nach rechts
*/

var svg;
var scaling = 1.2;
var w, h;
var t=Date.now();
var state; // 0..main links at center,
           // 1..sub links expanded,
           // 2..content displayed
var active_main_node = null;
var active_sub_node = null;
var main_links = loadData();
var sub_links = null;
var content = null;

function init() {
  w = 1200;
  h = 800;
  svg = d3.select("div#background")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  
  init_background();
  
  svg.append("g")
    .classed("main", true);
    
  var main = svg.select("g.main")
    .selectAll("g.hexagon")
    .data(main_links, function(d) { return d.id; })
    .enter()
    .append("g")
    .classed("hexagon", true)
    .on("click", clicked_main);
    
  main.append("polygon")
   .classed("main", true)
   .attr("points", function(d) { return hexagon(a, 0, 0); });

  main.append("text")
   .text(function(d) { return d.label; });
  
  state = 0;
  transition_to(0, true);
}

function move_to_center(duration, callback) {
  var cb = new OnlyFirst(callback);
  svg.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(scaling,w/2,(h-ah+2*gap)/2))
    .each("end", cb.f);
}

function move_to_left(duration, callback) {
  var cb = new OnlyFirst(callback);
  d3.select("g.main")
    .transition()
    .duration(duration)
    .attr("transform", transform(1, (2.5*(a+gap))+100, (h-ah+2*gap)/2))
    .each("end", cb.f);
}

function clicked_sub(d) {
 if (d.selected) {
    // the currently selected sub link was clicked
    active_sub_node = null;
    transition_to(1);
  } else {
    // a currently not selected sub link was clicked
    active_sub_node = this;
    transition_to(2);
  }
}

function clicked_main(d) {
  if (d.selected) {
    // the currently selected main link was clicked
    active_main_node = null;
    transition_to(0);
  }
  else {
    // a currently not selected main link was clicked
    active_main_node = this;
    transition_to(1);
  }
}

function updateSelection() {
  d3.selectAll("polygon")
    .classed("selected", function(d) { return d.selected});
}

function transition_to(new_state, immediately, callback) {
  var dur = immediately ? 0 : 1000; 
  var cb = new OnlyFirst(callback);
  
  if (new_state == 0) {
    // deselect every main link
    for (var i=0; i<main_links.length; i++) main_links[i].selected = false;
    updateSelection();
    sub_links = null;
    content = null;
    if (state == 2) { update_content(content, dur, cb.f); }
    if (state != 0) {
      // remove sub links (don't call position_hexagons, otherwise remove will be cancled)
      update_sub(sub_links, dur, function() {move_to_center(dur, cb.f)});
    } else {
      position_hexagons(dur);
      move_to_center(dur, cb.f);
    }
    state = 0;
  }
  else if (new_state == 1) {
    if (!active_main_node) throw "'active_main_node' link must be set to transition to state 1";
    var d = d3.select(active_main_node).data()[0];
    sub_links = d.children;
    content = null;
    if (state == 2) { update_content(null, dur, cb.f); }
    // select the new main link
    for (var i=0; i<main_links.length; i++) main_links[i].selected = false;
    d.selected = true;
    updateSelection();
    // set its index to 0
    if (d.i != 0) for (var i=0; i<main_links.length; i++) {
      if (main_links[i].i == 0) {
        main_links[i].i = d.i;
        d.i = 0;
        break;
      }
    }
    position_hexagons(dur);
    move_to_left(dur, function() { update_sub(sub_links, dur, cb.f); });
    state = 1;
  }
  else if (new_state == 2) {
    if (!active_sub_node) throw "'active_sub_node' link must be set to transition to state 2";
    var d = d3.select(active_sub_node).data()[0];
    var path = d.img.split('.png')[0]+'_big.png';
    content = [path];
    // select the new sub link
    for (var i=0; i<sub_links.length; i++) sub_links[i].selected = false;
    d.selected = true;
    updateSelection();
    // set its index to main_links.length
    var sidx = main_links.length;
    if (d.i != sidx) for (var i=0; i<sub_links.length; i++) {
      if (sub_links[i].i == sidx) {
        sub_links[i].i = d.i;
        d.i = sidx;
        break;
      }
    }
    position_hexagons(dur, cb.f);
    if (state == 2) {
      update_content(null, dur/2, function() { update_content(content, dur/2, cb.f) });
    } else update_content(content, dur, cb.f);
    state = 2;
  }
}

function update_content(content, dur, callback) {
  var content = content || [];
  var cb = callback instanceof OnlyFirst ? callback : new OnlyFirst(callback);
  var elem = d3.select("svg g.main").selectAll("g.content")
    .data(content);
  var x = hexpos(a+gap,[5,0])[0]-a;
  var y = hexpos(a+gap,[5,0])[1];
  var elem_enter = elem.enter()
    .insert("g", "g.content")
    .classed("content", true)
    .attr("transform", transform(1, x, y))
    .attr("opacity", 1e-6); // don't use 0, since values will be stringified to exp-notation
                            // which are invalid as opacity values (e.g. 1e-7)

//  elem_enter.append("polygon")
//    .classed("content", true)
//    .attr("points", function(d) { return content_shape(a+gap/2, 10); });
  elem_enter.append("image")
    .attr("x", -a+2)
    .attr("y", -274/2)
    .attr("width", 532)
    .attr("height", 273);

  elem.select("image")
    .attr("xlink:href", function(d) { return "imgs/" + d })

  elem_enter.transition()
    .duration(dur)
    .attr("opacity", 1)
    .each("end", cb.f);
  
  elem.exit()
    .transition()
    .duration(dur)
    .attr("opacity", 1e-6)
    .remove()
    .each("end", cb.f);
}

function update_sub(links, dur, callback) {
  links = links || [];
  var cb = new OnlyFirst(callback);
  var hexes = d3.select("svg g.main").selectAll("g.hexagon")
    .data(main_links.concat(links), function(d) {return d.id});

  var pos = hexpos(a+gap, places[0]);
  
  var hexes_enter = hexes.enter()
    .insert("g", "g.hexagon")
    .classed("hexagon", true)
    .attr("transform", transform(1, pos[0], pos[1]))
    .on("click", clicked_sub);

  hexes_enter.append("polygon")
   .classed("sub", true)
   .attr("points", function(d) { return hexagon(a, 0, 0); });
 
  hexes_enter.append("image")
    .attr("xlink:href", function(d) { return "imgs/" + d.img})
    .attr("x", -a)
    .attr("y", -ah/2)
    .attr("width", 2*a)
    .attr("height", ah);

  position_hexagons(dur, cb.f);
  
  hexes.exit()
    .transition()
    .duration(dur)
    .attr("transform", transform(1, pos[0], pos[1]))
    .remove()
    .each("end", cb.f);
}

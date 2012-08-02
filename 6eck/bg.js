function init_background() {
//  var gradient = svg.append("svg:defs")
//    .append("svg:linearGradient")
//      .attr("id", "gradient")
//      .attr("x1", "50%")
//      .attr("y1", "0%")
//      .attr("x2", "50%")
//      .attr("y2", "100%")
//      .attr("spreadMethod", "pad");

//  gradient.append("svg:stop")
//      .attr("offset", "0%")
//      .attr("stop-color", "#fff")
//      .attr("stop-opacity", 1);

//  gradient.append("svg:stop")
//      .attr("offset", "40%")
//      .attr("stop-color", "#fff")
//      .attr("stop-opacity", 1);

//  gradient.append("svg:stop")
//      .attr("offset", "100%")
//      .attr("stop-color", "#aaa")
//      .attr("stop-opacity", 1);

//  addCircles(10);
  
//  addBars(15, 15);
  addBarsImg();
}
    
//function add_image_patterns() {
//  var patt = svg.select("defs")
//    .append("svg:pattern")
//    .attr("id", "img1")
//    .attr("patternUnits", "userSpaceOnUse")
//    .attr("width", 155)
//    .attr("height", 135);
//  patt.append("svg:image")
//      .attr("xlink:href", "imgs/grafik_klein.png")
//      .attr("x", 0)
//      .attr("y", 0)
//      .attr("width", 155)
//      .attr("height", 135);
//}

function addCircles(N) {
  var rmin = 5, rmax = 100;
  var colors = d3.scale.category10();
  var circles = [];
  for (var i=0; i<N; i++) {
    circles.push({r: randomInt(rmin, rmax)
                 ,x: randomInt(rmax,w-rmax)
                 ,y: randomInt(rmax,h-rmax)
                 ,color: colors(i)
                 ,dx: Math.random() < 0.5 ? -1 : 1
                 ,dy: Math.random() < 0.5 ? -1 : 1});
  }
  
  function move() {
    d3.select(this)
    .transition()
    .ease("linear")
    .duration(1000)
    .attr("cx", function(d) {
      d.x += 3*d.dx;
      if (d.x > w) d.dx = -d.dx;
      if (d.x < 0)  d.dx = -d.dx;
      return d.x;
    })
    .attr("cy", function(d) {
      d.y += 3*d.dy;
      if (d.y > h) d.dy = -d.dy;
      if (d.y < 0)  d.dy = -d.dy;
      return d.y;
    })
    .each("end", move);
  }  

  d3.select("svg").selectAll("circle")
     .data(circles)
     .enter()
     .append("circle")
     .attr("opacity", 0.2)
     .attr("stroke", "none")
     .attr("fill", function(d) { return d.color})
     .attr("cx", function(d) { return d.x })
     .attr("cy", function(d) { return d.y })
     .attr("r", function(d) { return d.r })
     .each(move);
}

function addBarsImg() {
  var g = svg.append("image")
    .attr("xlink:href", "imgs/bg-stripes.png")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("opacity", 0.3);
}

function addBars(bar, gap) {
  var rot = -45;
  var bars = getBars(rot/180*Math.PI,bar,gap);
    
  var g = svg.append("g")
     .attr("transform", "translate("+(w/2)+","+(h/2)+")rotate("+rot+")")
     .attr("opacity", 0.2);
  g.selectAll("rect")
     .data(bars)
     .enter()
     .append("rect")
     .attr("stroke", "none")
     .attr("x", function(d) { return d.x; })
     .attr("width", function(d) { return d.w; })
     .attr("y", function(d) { return d.y; })
     .attr("height", function(d) { return d.h; })
     .attr("fill", "url(#gradient)");
}

function getBars(rot, w_bar, w_gap) {
  var bars = [];
  var hb = Math.abs(w*Math.sin(rot)) + Math.abs(h*Math.cos(rot));
  var wb = Math.abs(w*Math.cos(rot)) + Math.abs(h*Math.sin(rot));
  for (var x=0; x<wb; x += w_bar+w_gap) {
    bars.push({x:x-wb/2, y:-hb/2, w: w_bar, h: hb});
  }
  return bars;
}

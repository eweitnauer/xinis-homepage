var N=10;
var colors = d3.scale.category10();

function draw_random(N) {
  var d=[];
  for (var i=0; i<N; i++) {
    d.push({x:Math.random()*540, y:Math.random()*380});
  }
  return d;
}

var terms = [0, 1, 3, 7, 9, 'x', '5x', '+', '=', '-2x+5'];

function init() {
  var divs = d3.select("div#main").selectAll("div")
    .data(draw_random(N))
    .enter().append("div")
    .attr("class", "floating")
    .call(dragable);
  
  divs.append("span").text(function(d,i) {return terms[i]});
    //.style("background-color", function(d,i) {return colors(i)})
    //.style("border-color", function(d,i) {return d3.hsl(colors(i)).darker()});
  
  update();
//  setInterval(update, 1500);
}

function dragmove(d, i) {
  d.x2 += d3.event.dx;
  d.y2 += d3.event.dy;
  d3.select(this)
    .style("top", function(d) { return d.y2 + 'px' })
    .style("left", function(d) { return d.x2 + 'px' })
}

var dragable = d3.behavior.drag()
  .on("drag", dragmove)
  .on("dragstart", function(d) { d.x2 = d.x; d.y2 = d.y; d3.select(this).transition().style("font-size", "80px"); })
  .on("dragend", function(d) { update(); })


function update() {
  d3.selectAll("div.floating")
    //.data(draw_random(N))
    .transition()
    .ease("cubic-out")
    .duration(400)
    .style("top", function(d) { return d.y + 'px' })
    .style("left", function(d) { return d.x + 'px' })
    .style("font-size", "60px");
}

var N=10;
var colors = d3.scale.category10();

function draw_random(N) {
  var d=[];
  for (var i=0; i<N; i++) {
    d.push({x:Math.random()*540, y:Math.random()*380});
  }
  return d;
}

function init() {
  d3.select("div#main").selectAll("div")
    .data(draw_random(N))
    .enter().append("div")
    .attr("class", "floating")
    .style("background-color", function(d,i) {return colors(i)})
    .style("border-color", function(d,i) {return d3.hsl(colors(i)).darker()});
  
  update();
  
  setInterval(update, 1500);
}

function update() {
  d3.selectAll("div.floating")
    .data(draw_random(N))
    .transition()
    .duration(1000)
    .style("top", function(d) { return d.y + 'px' })
    .style("left", function(d) { return d.x + 'px' })
}

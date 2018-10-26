(function() {

  const data = [{
      'name': 'Within Tolerance',
      'value': '56',
      'color' : '#60e6e6'
    },
    {
      'name': 'Approaching Tolerance',
      'value': '17',
      'color' : '#60e6e6'
    },
    {
      'name': 'Exceeds Tolerance',
      'value': '4',
      'color' : '#60e6e6'
    },
    {
      'name': 'Not Started',
      'value': '15',
      'color' : '#60e6e6'
    },
    {
      'name': 'Completed',
      'value': '28',
      'color' : '#666'
    }
  ];

  // d3.json("/data/employees.json", function(data) {
  //   console.log(data[0]);
  // });

  const title = 'RECOMMENDATIONS';

  const width = 480;
  const height = 320;
  const headingOffesetHeight = 40;
  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };
  var totalValue = 0;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = (((innerHeight > innerWidth) ? innerWidth : innerHeight) / 2) - headingOffesetHeight;

  const svgPointer = document.getElementById('recommendations').getElementsByTagName('svg')[0];

  const svg = d3.select(svgPointer)
    .attr('width', width)
    .attr('height', height);

  const titleGroup = svg.append('g').attr("class", "title-group")
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  const pieChartArcGroup = svg.append('g').attr("class", "pie-group")
    .attr('transform', 'translate(' + (margin.left + radius) + ',' + (margin.top + radius + headingOffesetHeight) + ')');

  const pieChartColorInfoGroup = svg.append('g').attr("class", "info-group")
    .attr('transform', 'translate(' + (margin.left * 2) + ',' + (margin.top * 2) + ')');

  const pieChartTotalCountGroup = svg.append('g').attr("class", "total-count")
    .attr('transform', 'translate(' + (margin.left + radius) + ',' + (margin.top + radius + headingOffesetHeight) + ')');

  titleGroup.append('text').attr('class', 'legend-label')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .style('font-size', '150%')
    .attr('class', 'graphName')
    .text(title);

  const pieValue = function(d) {
    return d.value;
  };
  const colorValue = function(d) {
    return d.name;
  };
  const infoName = function(d) {
    totalValue += Number(d.data.value);
    return d.data.name + ' (' + d.data.value + ')';
  };
  const indexNumber = function(d) {
    console.log(d);
    return 1;
  };
  const returnToParent = function() {
    return this.parentNode;
  };

  const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

  const arc = d3.arc().innerRadius(radius / 2).outerRadius(radius);
  const pie = d3.pie().value(pieValue);
  const arcs = pie(data);

  pieChartArcGroup.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return d.data.color;
    });

  pieChartColorInfoGroup.selectAll('g')
    .data(arcs)
    .enter()
    .append('g')
    .attr('class', 'info-group-item')
    .append('circle')
    .attr('cy', function(d) {
      return margin.top + (headingOffesetHeight * 1.5) + ((d.index) * (radius / 3.333));
    })
    .attr('cx', (margin.left * 4) + (radius * 2))
    .attr('r', (radius / 10))
    .attr('fill', function(d) {
      return d.data.color;
    })
    .select(returnToParent)
    .append('text')
    .attr('y', function(d) {
      return margin.top + (headingOffesetHeight * 1.6) + ((d.index) * (radius / 3.333));
    })
    .attr('x', (margin.left * 4) + (radius * 2) + (radius / 5))
    .text(infoName);

  pieChartTotalCountGroup.append('text')
    .attr('y', 10)
    .attr('x', -25)
    .style('font-size', '222%')
    .text(totalValue);
})();

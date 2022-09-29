// set the dimensions and margin of the graph
const margin = {
  top: 12,
  right: 60,
  bottom: 12,
  left: 60
}

const $graphWrapper = d3.select(".graph")

// Set outer dimensions
const {
  width,
  height
} = $graphWrapper.node().getBoundingClientRect()

// Set inner dimensions
const innerwidth = width - margin.left - margin.right
const innerheight = height - margin.top - margin.bottom

// append the svg object to the body of the page
const svg = $graphWrapper
  .append('svg:svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight)
  .attr('class', 'svg-plot')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// set x-scale
const x = d3.scaleTime()
  .range([0, innerwidth]);

// set y-scale
const y = d3.scaleLinear()
  .domain([4, 28])
  .range([innerheight, 0])

// set radius scale
const sizeScale = d3.scalePow()
  .range([1, 5]);

// set colour scaleSqrt
const colourScale = d3.scaleOrdinal()
  .domain([2015, 2016, 2017, 2018, 2019])
  .range(["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]);

const colourScalePastel = d3.scaleOrdinal()
  .domain([2014, 2015, 2016, 2017, 2018, 2019])
  // .range(["#f7d1cd", "#e8c2ca", "#d1b3c4", "#b392ac", "#735d78"]);
  .range(d3.schemeBuPu[6])

// circular parameters
const radius = Math.min(width, height) / 2; // radius of the whole chart

const r = d3.scaleLinear()
  .domain([0, 28])
  .range([0, radius]);

const line = d3.lineRadial()
  .radius(function(d) {
    return r(d[1]);
  })
  .angle(function(d) {
    return -d[0] + Math.PI / 2;
  });

// set x-axis
const xAxis_major = d3.axisBottom(x)
  .tickValues([new Date(2016, 0, 1), new Date(2017, 0, 1), new Date(2018, 0, 1), new Date(2019, 0, 1)])
  .tickSize(-innerheight)
  .tickPadding(28)
  .tickFormat(d3.timeFormat('%Y'))

const xAxis_minor = d3.axisBottom(x)
  // .ticks(width > 600 ? 12 * 5 : 10)
  .tickSize(-innerheight)
  .tickPadding(6)
  .tickFormat(d3.timeFormat('%b'))

const yAxis = d3.axisLeft(y)
  .tickSize(12)
  .tickPadding(6)
  .tickValues([4, 8, 12, 16, 20, 24, 28])
  .tickFormat((d, i) => ["04:00", "08:00", "12:00", "16:00", "20:00", "00:00", "04:00"][i])

const files = ['data/data.csv']

// Read the data
Promise.all(files.map(url => d3.csv(url)))
  .then(([data]) => {
    const parseDate = d3.timeParse('%Y-%m-%d')

    data.forEach((d) => {
      d.date = parseDate(d.date),
        d.hour_num = +d.hour_num,
        d.words = +d.words
    })

    d3.select(".scrollyteller__stickyScreen").classed("bg--dark", true)

    drawGraph(".graph", data)

    svg.selectAll('.dot').classed("hide", true)
    xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
    updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))
  })
  .then(graph => {
    const stepFunctions = {
      step0: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        svg.selectAll('.dot').classed("hide", true)
      },
      step1: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        // show dots
        svg.selectAll('.dot').classed("hide", true)
        svg.selectAll('.dot[data-id = "firstDay"]').classed("hide", false)

        resetAnnotation()
      },
      step2: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        // show dots
        svg.selectAll('.dot').classed("hide", true)
        svg.selectAll('.dot[data-id = "firstDay"]').classed("hide", false)

        resetAnnotation()
        addAnnotation("Eerste bericht op 25 aug 2015 rond 14u30", new Date(2015, 7, 25), 14.5, "left")
      },
      step3: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        // show dots
        svg.selectAll('.dot').classed("hide", true)
        svg.selectAll('.dot[data-id = "firstDay"]').classed("hide", false)

        resetAnnotation()
        addAnnotation("Laat in de avond terug goed aan het sturen", new Date(2015, 7, 25), 23, "left")
      },
      step4: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        // show dots
        svg.selectAll('.dot').classed("hide", true)
        svg.selectAll('.dot[data-id = "firstDay"]').classed("hide", false)

        resetAnnotation()
      },
      step5: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%d %b %Y'))
        updateX(new Date(2015, 7, 24), new Date(2015, 8, 2))

        // hide dots
        svg.selectAll('.dot').classed("hide", true)

        // show dots
        svg.selectAll('.dot[data-id = "topDay"]')
          .filter((d) => {
            return d.day_of_the_year <= 245 && d.year == 2015
          }).classed("hide", false)

        resetAnnotation()
      },
      step6: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%b'))
        updateX(new Date(2015, 5, 0), new Date(2020, 0, 0))
        resetAnnotation()

        svg.selectAll('.dot').classed("hide", false)

        svg.selectAll(".dot")
          .attr("fill", "rgb(240,255,240)")
      },
      step7: (graph) => {
        xAxis_minor.tickFormat(d3.timeFormat('%b'))
        updateX(new Date(2015, 5, 0), new Date(2020, 0, 0))
        svg.selectAll('.dot').classed("hide", false)

        transToLinear('.graph')

        svg.selectAll(".dot")
          .attr("fill", (d) => {
            return colourScale(d.year)
          })
      },
      step8: (graph) => {
        svg.selectAll('.dot').classed("hide", false)

        transToRadial('.graph')

        svg.selectAll(".dot")
          .attr("fill", (d) => {
            return colourScale(d.year)
          })
      },
      step9: (graph) => {
        svg.selectAll('.dot').classed("hide", false)

        d3.select(".scrollyteller__stickyScreen").classed("bg--dark", true)
        transToRadial('.graph')

        svg.selectAll(".dot")
          .attr("fill", (d) => {
            return colourScalePastel(d.year)
          })
      },
      step10: (graph) => {
        svg.selectAll('.dot').classed("hide", false)

        d3.select(".scrollyteller__stickyScreen").classed("bg--dark", false)

        transToRadial('.graph')

        svg.selectAll(".dot")
          .attr("fill", (d) => {
            return colourScalePastel(d.year)
          })
      }
    }

    /* Initialize the observers and set the treshold */
    const observerMoving = new IntersectionObserver(observedMoving, {
      threshold: 0.66
    })

    /* Link the observer to the elements that should trigger it */
    const entriesMoving = document.querySelectorAll('.scrollyteller__movingScreen .scrollyteller__content')
    entriesMoving.forEach(entry => observerMoving.observe(entry))

    /* Call the function when one of our elements is observed */
    function observedMoving(entries) {
      /* This function gets called when elements leave the screen as well, so we should filter to just keep the new element */
      const visibleElement = entries.find(entry => entry.isIntersecting)

      if (visibleElement) {
        /* Access the right element in the DOM */
        const target = visibleElement.target

        /* Read the dat-id attributes of both element and parent */
        const elementId = target.getAttribute('data-id')

        /* Call our own function with these ids */
        stepFunctions[elementId](graph)
      }
    }
  })

const drawGraph = function(inputDiv, inputData) {

  // set x domain
  x.domain([new Date(2015, 0, 0), new Date(2016, 3, 0)])

  const xFlat = d3.scaleLinear()
    .domain(d3.extent(inputData, d => d.day_of_the_year))
    .range([0, innerwidth]);

  svg.append("line")
    .attr("class", "axis axis--midnight")
    .attr("x1", 0)
    .attr("x2", innerwidth)
    .attr("y1", d => y(24))
    .attr("y2", d => y(24))

  svg.append('g')
    .attr('class', 'axis axis--x axis--minor')
    .attr('transform', `translate(0, ${innerheight})`)
    .call(xAxis_minor)

  svg.append('g')
    .attr('class', 'axis axis--x axis--major')
    .attr('transform', `translate(0, ${innerheight})`)
    .call(xAxis_major)

  svg.append("g")
    .attr('class', 'axis axis--y')
    .call(yAxis);

  // Add r scale
  sizeScale
    .domain(d3.extent(inputData, d => d.words))

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(inputData)
    .join("circle")
    .attr("class", d => `dot dot__${d.year} dot__white`)
    .attr("data-id", d => d.type)
    .attr("date", d => `${d.year}${d.day_of_the_year}`)
    .attr("dx", 12)
    .attr("cx", (d) => {
      return x(d.date);
    })
    .attr("cy", (d) => {
      return y(d.hour_num);
    })
    // .attr("r", 0)
    .attr("r", (d) => {
      return sizeScale(d.words)
    })
    .attr("fill", "rgb(240,255,240)")

  d3.selectAll(".axis").selectAll(".domain").remove()

}

const updateX = function(min, max) {
  // set new domain
  x.domain([min, max])

  // transition axis
  svg.selectAll(".axis--x.axis--minor")
    // .transition().duration(1000)
    .call(xAxis_minor)

  svg.selectAll(".axis--x.axis--major")
    // .transition().duration(1000)
    .call(xAxis_major)

  // transition dots
  d3.selectAll(".dot")
    .transition()
    .delay((d, i) => i ** 1 / 4)
    .attr("cx", (d) => {
      return x(d.date);
    })
    .attr("cy", (d) => {
      return y(d.hour_num);
    })

  d3.selectAll(".axis").selectAll(".domain").remove()
}

const resetAnnotation = function() {
  svg.selectAll(".annotation").remove()
}

const addAnnotation = function(text, xPos, yPos, align) {
  const annotationMargin = 24;

  switch (align) {
    case "left":

      svg
        // .select(".annotation__line")
        .append("line")
        .attr("class", "annotation annotation__line")
        .attr("x1", (d) => {
          return x(xPos)
        })
        .attr("x2", (d) => {
          return x(xPos) + annotationMargin
        })
        .attr("y1", (d) => {
          return y(yPos);
        })
        .attr("y2", (d) => {
          return y(yPos);
        })

      svg
        .append("text")
        .attr("class", "annotation")
        .attr("dx", 6)
        .attr("dy", 4)
        .attr("x", (d) => {
          return x(xPos) + annotationMargin + 12
        })
        .attr("y", (d) => {
          return y(yPos);
        })
        .html(`${text}`)
        .call(wrap, 180)


      break;
    case "right":

      svg
        // .select(".annotation__line")
        .append("line")
        .attr("class", "annotation annotation__line")
        .attr("x1", (d) => {
          return x(xPos)
        })
        .attr("x2", (d) => {
          return x(xPos) - annotationMargin
        })
        .attr("y1", (d) => {
          return y(yPos);
        })
        .attr("y2", (d) => {
          return y(yPos);
        })

      svg
        .append("text")
        .attr("class", "annotation")
        .attr("text-anchor", "end")
        .attr("x", (d) => {
          return x(xPos) - annotationMargin
        })
        .attr("y", (d) => {
          return y(yPos);
        })
        .html(`${text}`)
        .call(wrap, 180)

      break;
    default:

  }
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.4, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 0, //parseFloat(text.attr("dy")),
      tspan = text.text(null)
      .append("tspan")
      .attr("x", x)
      .attr("y", y)
      .attr("dx", -6)
      .attr("dy", dy + "em");

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dx", -6)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

const transToLinear = function() {

  svg.selectAll('.dot')
    .transition()
    .delay((d, i) => i * 0.25)
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.hour_num))
    .attr('transform', 'translate(0,0)')

  svg.selectAll(".axis").classed("hide", false)

}

const transToRadial = function() {

  svg.selectAll('.dot')
    .transition()
    .delay((d, i) => i * 0.25)
    .attr("cx", innerwidth / 2)
    .attr("cy", innerheight / 2)
    .attr('transform', function(d) {
      let coors = line([[reMap(d.day_of_the_year), d.hour_num]]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
      return 'translate(' + coors + ')'
    })

  svg.selectAll(".axis").classed("hide", true)
}

const reMap = function(oldValue) {
  var oldMin = 0,
    oldMax = -359,
    newMin = 0,
    newMax = (Math.PI * 2),
    newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

  return newValue;

}

function graphDraw(fiber='reforço', young_mod_fiber = 0, fiberUnity = 'Gpa', fiberColor = '#85CDCA',
                   matriz='matriz', young_mod_matriz = 0, matrizUnity = 'Gpa', matrizColor = '#E27D60', points = 1) {

  if (fiberUnity === 'Mpa') {
      young_mod_fiber /= 1e3
  }

  if (matrizUnity === 'Mpa') {
      young_mod_matriz /= 1e3
  }

  const youngModFiber = young_mod_fiber
  const youngModMatriz = young_mod_matriz

  let fiberPercent = []
  let youngModIsodeformation = []
  let youngModIsotension = []

  for (var x = 0; x <= 1.001; x += 0.01/(2*points)) {
    fiberPercent.push(x*100)
    youngModIsodeformation.push(youngModFiber*x+youngModMatriz*(1-x))
    youngModIsotension.push((x/youngModFiber+(1-x)/youngModMatriz)**(-1))
  }

  const isodeformation = {
    x: fiberPercent,
    y: youngModIsodeformation,
    name: 'isodeformação',
    line: {
      color: fiberColor,
      width: 2
    },
    type: 'scatter',
    mode: 'lines+markers'
  }

  const isotension = {
    x: fiberPercent,
    y: youngModIsotension,
    name: 'isotensão',
    mode: 'lines+markers',
    type: 'scatter',
    line: {
      color: matrizColor,
      width: 2
    },
  }

  const layout = {
    title:fiber + ' e ' + matriz,
    showlegend: true,
    paper_bgcolor: "#FAFBFB",
    plot_bgcolor: "#FAFBFB",
    legend: {orientation: "h",
             yanchor: "bottom"},
    xaxis: {
      title: 'Concentração de ' + fiber + ' (%Vol)'
    },
    yaxis: {
      title: 'Módulo de elasticidade (GPa)'
    }
  }
  const data = [isodeformation, isotension];
  const config = {responsive: true}
  Plotly.newPlot('myDiv', data, layout, config);
}

graphDraw()



let values = []

function updateValues() {
  values = []
  document.querySelectorAll(['input','select']).forEach( function(input) {
    values.push(input.value)
  })
}

document.querySelectorAll(['input','select']).forEach( function(input) {
    input.addEventListener('change', function(event) {
      updateValues()
      graphDraw(fiber = values[0], young_mod_fiber = values[1], fiberUnity = values[2], fiberColor = values[3],
                   matriz = values[4], young_mod_matriz = values[5], matrizUnity = values[6], matrizColor = values[7], points = values[8])
      
    })
})


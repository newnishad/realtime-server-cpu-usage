(function () {
  var cpuUsage = {
    x: [],
    y: [],
    type: "scatter",
    name: "S",
  };
  var data = [cpuUsage];
  var layout = {
    title: "CPU Usage",
    xaxis: {
      title: {
        text: "Time (1s)",
        font: {
          family: "Courier New, monospace",
          size: 18,
          color: "#7f7f7f",
        },
      },
      type: "log",
      autorange: true,
    },
    yaxis: {
      title: {
        text: "CPU Load",
        font: {
          family: "Courier New, monospace",
          size: 18,
          color: "#7f7f7f",
        },
      },
      type: "log",
      autorange: true,
    },
  };

  Plotly.newPlot("cpuUsage", data, layout);

  var t = 0;

  setInterval(function () {
    api("cpu.php", (response) => {
      t++;
      cpuUsage.x.push(t);
      cpuUsage.y.push(response.cpu);

      if (cpuUsage.y.length > 50) {
        cpuUsage.x.shift();
        cpuUsage.y.shift();
      }
      Plotly.newPlot("cpuUsage", data, layout);
    });
  }, 1000);
})();

function api(api, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", api, true);
  xhttp.onreadystatechange = function (response) {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      try {
        var response = JSON.parse(xhttp.responseText);
        callback(response);
      } catch (e) {
        callback(xhttp.responseText);
      }
    }
  };
  xhttp.send();
}

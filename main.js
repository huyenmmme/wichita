$(document).ready(function(){
    const table = $('#dt-table').DataTable();
    const tableData = getTableData(table);
    createHighcharts(tableData);
    setTableEvents(table);
});

function getTableData(table) {
    const dataArray = [],
      categoryArray = [],
      y18Array = [],
      y19Array = [];

    // loop table rows
    table.rows({ search: "applied" }).every(function() {
      const data = this.data();
      categoryArray.push(data[0]);
      y18Array.push(parseInt(data[1].replace(/\,/g, "")));
      y19Array.push(parseInt(data[2].replace(/\,/g, "")));
    });

    // store all data in dataArray
    dataArray.push(categoryArray, y18Array, y19Array);

    return dataArray;
  }

function createHighcharts(data){
    Highcharts.chart("chart", {
        chart: {
            zoomType: 'xy'
        },
        title: {
        text: "Chart Title"
        },
        subtitle: {
        text: "Update: December 4, 2020 from source's website <br>Click and drag in the plot area to zoom in"
        },
        xAxis: [
        {
            categories: data[0],
            labels: {
            rotation: -45
            }
        }
        ],
        yAxis: [
        {
            title: {
            text: "Value"
            }
        }
        ],
        series: [
        {
            name: "2018",
            type: "lollipop",
            data: data[1],
            color: "orange"
        },
        {
            name: "2019",
            type: "lollipop",
            data: data[2],
            color: "red"
        }
        ],
        tooltip: {
        shared: true
        },
        legend: {
        backgroundColor: "white",
        shadow: true
        },
        credits: {
        enabled: false
        },
        noData: {
        style: {
            fontSize: "16px"
        }
        }
    });
}

  let draw = false;

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}
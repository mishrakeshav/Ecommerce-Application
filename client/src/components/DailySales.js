import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Sunday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Monday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Tuesday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Wednesday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Thrusday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Friday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
            {
              name: 'Saturday',
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18]
            },
           
            ],
            options: {
              chart: {
                height: 350,
                type: 'heatmap',
              },
              dataLabels: {
                enabled: false
              },
              colors: ["#008FFB"],
              title: {
                text: 'Daily Sales'
              },
            },
          
          
          };
        }

      

        render() {
          return (
            

      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
</div>
    
    );
}
}

export default ApexChart;

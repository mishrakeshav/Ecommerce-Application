import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Sunday',
              data: [
                12,
                12,
                17,
                20,
                17,
                11,
                20,
                13,
                14,
                16,
                11,
                12,
                14,
                14,
                19,
                18,
                15,
                16
            ]
            },
            {
              name: 'Monday',
              data:  [
                18,
                20,
                14,
                13,
                19,
                11,
                20,
                11,
                15,
                20,
                15,
                16,
                15,
                17,
                20,
                18,
                10,
                14
            ]
            },
            {
              name: 'Tuesday',
              data:  [
                12,
                10,
                20,
                18,
                11,
                12,
                15,
                10,
                18,
                19,
                16,
                19,
                15,
                17,
                15,
                17,
                14,
                19
            ]
            },
            {
              name: 'Wednesday',
              data: [
                10,
                14,
                16,
                13,
                10,
                14,
                10,
                13,
                18,
                18,
                20,
                17,
                16,
                19,
                20,
                19,
                15,
                19
            ]
            },
            {
              name: 'Thrusday',
              data:  [
                15,
                20,
                19,
                18,
                11,
                19,
                20,
                20,
                14,
                18,
                12,
                13,
                13,
                12,
                10,
                18,
                16,
                13
            ]
            },
            {
              name: 'Friday',
              data:  [
                12,
                20,
                20,
                20,
                19,
                16,
                12,
                15,
                16,
                19,
                19,
                16,
                15,
                11,
                13,
                20,
                16,
                15
            ]
            },
            {
              name: 'Saturday',
              data:  [
                15,
                13,
                19,
                10,
                19,
                16,
                17,
                15,
                14,
                15,
                20,
                16,
                14,
                10,
                18,
                14,
                10,
                16
            ]
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
              colors: ["#6ECB63"],
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

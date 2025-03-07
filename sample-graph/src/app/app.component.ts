import {Component, OnInit} from '@angular/core';
import {Color, LegendPosition, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {data} from "./data";
import {NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxChartsModule, NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'sample-graph';
  data = data
  graphData: any;
  currentValue: number = 0
  chartOptions: any = {};


  colorScheme: Color = {
    name: 'color',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#28a745', '#dc3545', '#6c757d']
  };
  protected readonly LegendPosition = LegendPosition;

  ngOnInit() {
    this.graphData = this.data.map(item => {
      return {
        value: item.value ? item.value : 1,
        name: item.status
      }
    })
    this.currentValue = this.graphData[0].value;

    this.chartOptions = {
      series: this.graphData.map((item: any) => item.value),
      chart: {
        height: 350,
        type: "radialBar"
      },
      fill: {
        type: "solid",
        color: "#00E396"
      },
      plotOptions: {
        radialBar: {
          startAngle: -100,
          endAngle: 100,
          hollow: {
            margin: 0,
            size: "40%",
            background: "white"
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "22px",
            },
            value: {
              show: true,
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Clinicals",
              formatter: function (w: any) {
                return "100%";
              }
            },
            track: {
              strokeWidth: "100%",
              background: "#E8E8E8",
            },
          }
        }
      },
      labels: this.graphData.map((item: any) => item.name),
      legends: {
        show: true,
        position: 'bottom',
      },
    };
    console.log(this.chartOptions);
  }

  onSelect(item: any) {
    console.log(item)
    this.currentValue = item.value;
  }

  getLabelColor = () =>{
    return this.graphData.map((item: any) =>
      item.value === 0 ? "#B0B0B0" : item.value > 70 ? "#00E396" : "#FF4560"
    )
  }
}

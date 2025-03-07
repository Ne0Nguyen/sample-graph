import {Component, OnInit} from '@angular/core';
import {Color, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {data} from "./data";
import {NgxEchartsModule} from "ngx-echarts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxChartsModule, NgxEchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sample-graph';
  data = data
  graphData: any;
  currentValue:number = 0

  colorScheme: Color = {
    name: 'color',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#28a745', '#dc3545', '#6c757d']
  };

  ngOnInit() {
    this.graphData = this.data.map(item => {
      return {
        value: item.value ? item.value : 1,
        name: item.status
      }
    })
    this.currentValue = this.graphData[0].value;
  }

  onSelect(item: any) {
    this.currentValue = item.value;
  }

}

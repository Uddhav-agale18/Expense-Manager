import { Component, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";
import { ActivatedRoute } from '@angular/router';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-year-charts',
  templateUrl: './year-charts.component.html',
  styleUrl: './year-charts.component.css'
})


export class YearChartsComponent {

  year: string = ''

  output: { month: "", total: number }[] = [];

  constructor(private expenseService: ExpenseService, private route: ActivatedRoute) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


  ngOnInit(): void {
    this.expenseService.getDataByMonths().subscribe({
      next: (value: { message: string, data: [] }) => {
        this.output = this.convertData(value.data)
        console.log(this.output)
      },
      error: (err) => {
        console.error(err)
      }
    });

    this.route.params.subscribe((e: { id: string }) => {
      this.year = e.id
    })

  }



  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  convertData(data: any[]) {
    const monthMapping = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };

    let convertedData = data.map(item => {

      if (item._id.ab.slice(0, 4) === this.year) {
        let ab = item._id.ab;
        let month = monthMapping[ab.slice(-2)];
        this.chartOptions.labels.push(month)
        this.chartOptions.series.push(item.totalAmount)
        return {
          month: month,
          total: item.totalAmount
        };
      } return null
    });

    return convertedData;
  }

}




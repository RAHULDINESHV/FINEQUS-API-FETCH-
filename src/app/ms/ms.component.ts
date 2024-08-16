import { Component, OnInit } from '@angular/core';
import { MsService } from '../ms.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ms',
  templateUrl: './ms.component.html',
  styleUrls: ['./ms.component.css']
})
export class MsComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  weatherData: any[] = [];
  fields: any[] = [];

  constructor(private msService: MsService) { }

  ngOnInit(): void {}

  login(): void {
    const validUsername = 'rahul';
    const validPassword = '11234';

    if (this.username === validUsername && this.password === validPassword) {
      alert('Login successful');
      this.isLoggedIn = true;
    } else {
      alert('Invalid username or password');
    }
  }

  getWeatherData(): void {
    this.msService.getWeather().subscribe({
      next: (data: any) => {
        console.log('Fetched data:', data);
        this.fields = data.field || [];
        this.weatherData = data.records || [];
      },
      error: (error: any) => {
        console.error('Error fetching weather data:', error);
      }
    });
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.weatherData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    XLSX.writeFile(workbook, 'weather-data.xlsx');
  }
}

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

  usernameError: string = '';
  passwordError: string = '';

  weatherData: any[] = [];
  fields: any[] = [];

  constructor(private msService: MsService) {}

  ngOnInit(): void {}

  login(): void {
    const validUsername = 'rahul';
    const validPassword = '11234';

    this.usernameError = '';
    this.passwordError = '';

    if (this.username !== validUsername) {
      this.usernameError = 'Invalid username';
    }

    if (this.password !== validPassword) {
      this.passwordError = 'Invalid password';
    }

    if (!this.usernameError && !this.passwordError) {
      this.isLoggedIn = true;
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
    // Map the weatherData to only include the displayed columns
    const filteredData = this.weatherData.map((field: any) => ({
      AID: field.AID,
      EnterpriseName: field.EnterpriseName,
      State: field.State,
      District: field.District,
      Pincode: field.Pincode,
      RegistrationDate: field.RegistrationDate,
      MajorActivity: field.MajorActivity
    }));
  
    // Create the worksheet from the filtered data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
  
    // Create the workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
  
    // Write the workbook to a file
    XLSX.writeFile(workbook, 'weather-data.xlsx');
  }
}
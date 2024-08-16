import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  password: string = '';

  login() {
    const validUsername = 'rahul';
    const validPassword = '11234';

    if (this.username === validUsername && this.password === validPassword) {
      alert('Login successful');
    } else {
      alert('Invalid username or password');
    }
  }
}
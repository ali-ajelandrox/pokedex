import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // The main content is shown initially, so no need to set isLoading to true here
  }

  goToDashboard(): void {
    this.isLoading = true;
    // Simulate loading time before navigating to the dashboard
    setTimeout(() => {
      this.router.navigate(['/dashboard']).then(() => {
        this.isLoading = false;
      });
    }, 2000); // Adjust time as needed
  }
}

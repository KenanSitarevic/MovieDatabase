import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  isLoading!: boolean;
  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.resultService.loader$.subscribe((data) => {
      this.isLoading = data;
    });
  }

  onTextSearch(event) {
    const searchTerm = event.target.value;
    this.resultService.setSearchTerm(searchTerm);
  }
}

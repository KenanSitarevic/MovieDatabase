import { Component, OnDestroy, OnInit } from '@angular/core';
import { Result } from 'src/app/Result';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  host: {
    class: 'container d-flex flex-wrap justify-content-center flex-row my-5',
  },
})
export class CardsComponent implements OnInit {
  results: Result[] = [];
  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.resultService.results$.subscribe((data) => {
      this.results = data.results;
    });
  }
}

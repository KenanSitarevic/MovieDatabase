import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit {
  url: any;
  details: any;
  imgPath: String = 'https://image.tmdb.org/t/p/original';

  constructor(private router: Router, private resultService: ResultService) {
    this.url = this.router.url;
  }

  ngOnInit() {
    this.resultService.results$.subscribe((data) => {
      this.details = data;
    });

    this.resultService.getResults('', '', this.url);
  }
}

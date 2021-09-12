import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  activeClass = null;

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {}

  changeCategory(category) {
    this.activeClass = category;
    this.resultService.setCategory(category);
  }
}

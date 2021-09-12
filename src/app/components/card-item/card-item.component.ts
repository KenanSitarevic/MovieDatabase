import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() title!: string;
  @Input() image!: string;
  @Input() id!: string;
  @Input() category!: string;
  imgPath: String = 'https://image.tmdb.org/t/p/original';

  constructor() {}

  ngOnInit(): void {}
}

import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginattionComponent implements OnInit {

  @Input() pagination:any;
  paginas:number[];

  constructor() { }

  ngOnInit(): void {
    this.paginas=new Array(this.pagination.totalPages).fill(0).map((_valor, indice)=>indice+1);
  }


}

import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-reader',
  templateUrl: './product-reader.component.html',
  styleUrls: ['./product-reader.component.css']
})
export class ProductReaderComponent implements OnInit {

  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.reader()
      .subscribe(produtos => {
        this.products = produtos
        console.log(this.products)        
      })    
  }

}

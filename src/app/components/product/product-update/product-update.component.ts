import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readerById(id)
      .subscribe((product: Product) => {
        this.product = product
        console.log(this.product)
      })
  }

  updateProduct() {
    this.productService.update(this.product)
      .subscribe(() => {
        this.productService.showMessage('Produto alterado com sucesso!')
        this.router.navigate(['/products'])
      })
  }

  cancelarProduct() {
    this.router.navigate(['/products'])
  }

}

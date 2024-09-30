import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { environment } from 'src/envronments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private activeroute:ActivatedRoute, private productservice:ProductService){}
  searchedproducts: any[] = [];

  ngOnInit(){
    this.activeroute.paramMap.subscribe(params => {
      const query = params.get('query'); // Get 'query' parameter from the route
      console.log('------->>>suri', query);

      if (query) {
        this.productservice.serachproduct(query).subscribe(res => {
          console.log('------------>>>products searched by the user', res);
          if (res.status) {
            res.data.forEach((product: { product_file_path: string; }) => {
              product.product_file_path = environment.apiEndpoint + product.product_file_path;
              console.log('--->>product.product_file_path,', product.product_file_path)
            });
            this.searchedproducts = res.data

          }
        });
      }
    });
  }

   

  

}

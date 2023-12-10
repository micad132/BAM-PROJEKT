package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.DTO.ProductDTORequest;
import BAMProject.magazineApp.model.DTO.ProductDTOResponse;
import BAMProject.magazineApp.model.Product;
import BAMProject.magazineApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public ResponseEntity<List<ProductDTOResponse>> getAllProducts() {
        List<ProductDTOResponse>  products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody ProductDTORequest productDTORequest) {
        productService.addProduct(productDTORequest);
        return ResponseEntity.ok("Dodano produkt!");
    }
}

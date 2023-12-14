package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.DTO.Product.EditProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTOResponse;
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

    @PutMapping
    public ResponseEntity<String> editProduct(@RequestBody EditProductDTORequest editProductDTORequest) {
        productService.editProduct(editProductDTORequest);
        return ResponseEntity.ok("Edytowano produkt!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable ("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Usunięto produkt!");
    }
}

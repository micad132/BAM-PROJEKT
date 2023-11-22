package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.ProductModel;
import BAMProject.magazineApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public List<ProductModel> getAllProducts() {
        return productService.getAllProducts();
    }
    @PostMapping
    public ProductModel createProduct(@RequestBody ProductModel product) {
        return productService.createProduct(product);
    }
}

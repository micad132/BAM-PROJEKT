package BAMProject.magazineApp.model;

import BAMProject.magazineApp.model.UserModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Entity;

@Getter
@Setter
@Builder
@Entity
@Table (name = "product_model")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;

    @ManyToOne
    private UserModel user;


// Getters and setters
}

package BAMProject.magazineApp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Product> productList = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Storage> storageList = new ArrayList<>();

}

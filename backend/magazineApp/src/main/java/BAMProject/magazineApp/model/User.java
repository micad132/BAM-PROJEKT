package BAMProject.magazineApp.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "city")
    private String city;

    @Column(name = "postal_code")
    private String postalCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Storage> storages = new ArrayList<>();



}

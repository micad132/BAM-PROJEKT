package BAMProject.magazineApp.repository;

import BAMProject.magazineApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT c from User c where c.username = ?1")
    Optional<User> findUserModelByUsername(String username);
}

package az.yeniproyekt.mahalla_magazalari_kataloqu.repository;

import az.yeniproyekt.mahalla_magazalari_kataloqu.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
}

package az.yeniproyekt.mahalla_magazalari_kataloqu.repository;

import az.yeniproyekt.mahalla_magazalari_kataloqu.model.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // Bu class verilənlər bazasından məlumat alır və saxlayır. Spring buranı avtomatik tanıyır və istifadə edir.
public interface ShopRepository extends MongoRepository<Shop, String> {
}

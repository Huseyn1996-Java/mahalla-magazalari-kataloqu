package az.yeniproyekt.mahalla_magazalari_kataloqu.service;

import az.yeniproyekt.mahalla_magazalari_kataloqu.dto.ShopDTO;
import java.util.List;

public interface ShopService {

    ShopDTO addShop(ShopDTO shopDTO);

    List<ShopDTO> getAllShops();

    ShopDTO getShopById(String id);

    void deleteShop(String id);

    ShopDTO updateShop(String id, ShopDTO shopDTO);

    ShopDTO updateShopName(String id, String name);
}

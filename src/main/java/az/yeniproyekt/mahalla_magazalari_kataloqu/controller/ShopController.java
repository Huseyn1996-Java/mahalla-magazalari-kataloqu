package az.yeniproyekt.mahalla_magazalari_kataloqu.controller;

import az.yeniproyekt.mahalla_magazalari_kataloqu.dto.ShopDTO;
import az.yeniproyekt.mahalla_magazalari_kataloqu.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Bu class HTTP sorğularını qəbul edir və JSON cavab qaytarır.
@RequestMapping("/api/shops") // Bu annotasiya deyir ki, bu metod və ya class hansı URL-ə cavab verir.
@CrossOrigin(origins = "*") // basqa domeinden sorgu gelmessine icaze verir
public class ShopController {

    @Autowired // bir class-ın içində avtomatik olaraq başqa bir class-ı əlavə etmək
    private ShopService shopService;

    @PostMapping("/create") // HTTP POST sorğularını idarə etmək üçün istifadə olunur.
    public ShopDTO addShop(@RequestBody ShopDTO shopDTO) {
        return shopService.addShop(shopDTO);
    }

    @GetMapping// HTTP GET sorğularını idarə etmək üçün istifadə olunur.
    public List<ShopDTO> getAllShops() {
        return shopService.getAllShops();
    }

    @GetMapping("/{id}") // HTTP GET sorğularını idarə etmək üçün istifadə olunur.
    public ShopDTO getShopById(@PathVariable String id) {
        return shopService.getShopById(id);
    }

    @DeleteMapping("/delete/{id}") // Silir
    public void deleteShop(@PathVariable String id) {
        shopService.deleteShop(id);
    }

    @PutMapping("/update/{id}") // HTTP PUT sorğularını idarə etmək üçün istifadə olunur
    public ShopDTO updateShop(@PathVariable String id, @RequestBody ShopDTO shopDTO) {
        return shopService.updateShop(id,shopDTO);
    }

    @PatchMapping("/{id}/name") // HTTP PATCH sorğularını idarə etmək üçün istifadə olunur.
    public ShopDTO updateShopName(@PathVariable String id, @RequestBody String name) {
        return shopService.updateShopName(id, name);
    }
}

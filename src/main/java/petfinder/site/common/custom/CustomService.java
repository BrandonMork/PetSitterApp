package petfinder.site.common.custom;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class CustomService {
    @Autowired
    private CustomDao customDao;

    public Optional<CustomDto> findCustom(Long id) {
        return customDao.findPet(id);
    }

    public void save(CustomDto pet) {
        customDao.save(pet);
    }
}
package petfinder.site.common.pet;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class PetService {
	@Autowired
	private PetDao petDao;

	//Calls PetDto findPet() function to search in elasticsearch
	public Optional<PetDto> findPet(Long id) {
		return petDao.findPet(id);
	}

	//Calls PetDto Save() function to save to elasticsearch
	public void save(PetDto petExample) {
		petDao.save(petExample);
	}
}
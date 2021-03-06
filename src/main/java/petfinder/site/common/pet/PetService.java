package petfinder.site.common.pet;

import java.util.List;

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
	public PetDto findPet(String principal, String name) {
		System.out.println("In the PetService with the name of " + name + " with principal " + principal);
		return petDao.getOnePet(principal, name);
	}

	//Calls PetDto Save() function to save to elasticsearch
	public void save(PetDto petExample) {
		petDao.save(petExample);
	}

	//GO TO PetDao after this call!
	public List<PetDto> findPets(String principal) {
		System.out.println("I hit the PetService and the principal is " + principal);
		return petDao.findPets(principal);
	}

	public void updatePet(PetDto pet){
		petDao.upDatePet(pet);
	}

    public void deletePet(String principal, String name){
	    petDao.deletePet(principal,name);
    }

}
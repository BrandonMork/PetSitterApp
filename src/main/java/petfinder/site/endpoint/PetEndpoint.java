package petfinder.site.endpoint;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping("/api/pets")
public class PetEndpoint {
	@Autowired
	private PetService petService;

	//get these functions from the PetService!!!
	@GetMapping(value = "/{principal}/{name}", produces = "application/json")
	public PetDto getPet(@PathVariable("principal") String principal, @PathVariable("name") String name) {
		System.out.println("In the PetEndpoint with pet name of  " + name + " with principal " + principal);
		return petService.findPet(principal,name);
	}

	@PostMapping(value = "/add-pet", produces = "application/json")
	public PetDto savePet(@RequestBody PetDto pet) {
		petService.save(pet);
		return pet;
	}

	@GetMapping(value = "/get-pets/{principal}")
	public List<PetDto> getPets(@PathVariable("principal") String principal) {
		System.out.println("I hit the pet endpoint and the principal is "+ principal);
		return petService.findPets(principal);
	}

	@PostMapping(value = "/edit-pet", produces = "application/json")
	public PetDto updatePet(@RequestBody PetDto pet) {
		petService.updatePet(pet);
		return pet;
	}

    @PostMapping(value = "/delete-pet/{principal}/{name}", produces = "application/json")
    public void deletePet(@PathVariable("principal") String principal, @PathVariable("name") String name) {
        petService.deletePet(principal,name);
    }



	// @TODO Delete pet function

//	return axios.post('/api/pets/edit-pet/' + principal);
}

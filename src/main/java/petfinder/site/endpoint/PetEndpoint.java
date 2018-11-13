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
	@GetMapping(value = "/{principal}/{id}", produces = "application/json")
	public PetDto getPet(@PathVariable("principal") String principal, @PathVariable("id") Long id) {
		System.out.println("In the PetEndpoint with the id " + id + " with principal " + principal);
		return petService.findPet(principal,id);
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

	// @TODO Delete pet function


}

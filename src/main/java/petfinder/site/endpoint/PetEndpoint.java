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

	@GetMapping(value = "/{id}", produces = "application/json")
	public Optional<PetDto> getPet(@PathVariable("id") Long id) {
		return petService.findPet(id);
	}

	@PostMapping(value = "/add-pet", produces = "application/json")
	public PetDto savePet(@RequestBody PetDto pet) {
		petService.save(pet);
		return pet;
	}

	@GetMapping(value = "/get-pets/{principal}")
	public List<PetDto> getPets(@PathVariable("principal") String principal) {
		System.out.println("I hit the pet endpoint");
		return petService.findPets(principal);
	}




}

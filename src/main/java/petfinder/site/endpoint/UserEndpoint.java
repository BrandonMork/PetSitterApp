package petfinder.site.endpoint;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserPetDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.user.UserService.RegistrationRequest;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	@Autowired
	private UserService userService;

	@GetMapping(value = "", produces = "application/json")
	public Optional<UserDto> getUserDetails() {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		return userService.findUserByPrincipal(principal);
	}

	@GetMapping(value = "/sitter/{principal}")
	public Optional<UserDto> getSitterInfo(@PathVariable ("principal") String principal) {
		System.out.println("In the UserEndpoint with principal " + principal);
		principal = principal.replace("*",".");
		return userService.findUser(principal);
	}

	@PostMapping(value = "/register")
	public UserDto register(@RequestBody RegistrationRequest request) {
		return userService.register(request);
	}

	@GetMapping(value = "/pet")
	public List<PetDto> getPets() {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		return userService.findPets(user);
	}

	@PostMapping(value = "/pet")
	public UserPetDto addPet(@RequestBody UserPetDto userPetDto) {
		return userService.save(userPetDto);
	}

	@PostMapping(value = "/update-user")
	public void updateUser(@RequestBody RegistrationRequest request){
		System.out.println("In the UserEndpoint for updateUser");
		System.out.println(request.getUserType());
		userService.updateUser(request);
	}

	@PostMapping(value = "/add-rating")
	public void addRating(@RequestBody RegistrationRequest request){
		userService.updateUser(request);
	}
}
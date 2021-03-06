package petfinder.site.common.pet;

import java.util.UUID;
import alloy.util.Identifiable;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto implements Identifiable {

	// Only the owner of that pet can create
	private String principal; // username, always will be unique (primary key)
	private String petId;
	private Long id;
	private String name;
	private String species;
	private String breed;
	private String size;
	private Long age;
	private String preferences;

	// @TODO Define what our types will be
	// i.e. Breed, Species, Size, Age, etc....
	// Will have more defined attributes as we go on

	public PetDto() {
		this.id = UUID.randomUUID().getMostSignificantBits();
		this.petId = this.id.toString();
		System.out.println("Made a pet object with id of " + id + " with a petID of " + petId);
	}

	public PetDto(String principal, String petId, Long id, String name, String species, String breed, String size, Long age, String preferences) {
		this.principal = principal;
		this.petId = petId;
		this.id = id;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.size = size;
		this.age = age;
		this.preferences = preferences;
	}

	public PetDto(String principal, String name) {
		this.principal = principal;
		this.name = name;
	}

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPetId() {
		return petId;
	}

	public void setPetId(String petId) {
		this.petId = petId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public String getPreferences() {
		return preferences;
	}

	public void setPreferences(String preferences) {
		this.preferences = preferences;
	}

	@Override
	public String toString() {
		return "PetDto{" +
				"principal='" + principal + '\'' +
				", petId='" + petId + '\'' +
				", id=" + id +
				", name='" + name + '\'' +
				", species='" + species + '\'' +
				", breed='" + breed + '\'' +
				", size='" + size + '\'' +
				", age=" + age +
				", preferences='" + preferences + '\'' +
				'}';
	}
}
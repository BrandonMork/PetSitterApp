package petfinder.site.common.pet;
import java.util.UUID;
import alloy.util.Identifiable;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto implements Identifiable {
	private Long ownerID;
	private Long id;
	private String name;
	private String species;
	private String breed;
	private String size;
	private String age;


	// @TODO Define what our types will be
	// i.e. Breed, Species, Size, Age, etc....
	// Will have more defined attributes as we go on

	public PetDto() {
		this.id = UUID.randomUUID().getMostSignificantBits();
	}

	public PetDto(Long ownerID, Long id, String name, String species, String breed, String size, String age) {
		this.ownerID = ownerID;
		this.id = id;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.size = size;
		this.age = age;
	}

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getOwnerID() {
		return ownerID;
	}

	public void setOwnerID(Long ownerID) {
		this.ownerID = ownerID;
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

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}
}
package petfinder.site.common.pet;
import java.util.UUID;
import alloy.util.Identifiable;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto implements Identifiable {

	// Only the owner of that pet can create
	private String principal; // username, always will be unique (primary key)
	private Long id;
	private String name;
	private String species;
	private String breed;
	private String size;
	private Long age;

	// @TODO Define what our types will be
	// i.e. Breed, Species, Size, Age, etc....
	// Will have more defined attributes as we go on

	public PetDto() {
		this.id = UUID.randomUUID().getMostSignificantBits();
	}

	public PetDto(String principal, Long id, String name, String species, String breed, String size, Long age) {
		this.principal = principal;
		this.id = id;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.size = size;
		this.age = age;
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

	@Override
	public String toString() {
		return "PetDto{" +
				"principal='" + principal + '\'' +
				", id=" + id +
				", name='" + name + '\'' +
				", species='" + species + '\'' +
				", breed='" + breed + '\'' +
				", size='" + size + '\'' +
				", age=" + age +
				'}';
	}
}
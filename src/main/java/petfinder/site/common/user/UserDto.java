package petfinder.site.common.user;

import java.util.List;
import org.codehaus.jackson.annotate.JsonIgnore;
import alloy.util.Momento;


/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;

	// @TODO Create a new Name object (?)
	private String firstName;
	private String middleName;
	private String lastName;

	// @TODO Create a new Address object (?)
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String zip;

	// @TODO Is this the correct data structure?
	private String phoneNumber;

	private List<UserPetDto> pets;
	private List<String> roles;
	private String type;

	private UserDto() {

	}

	//does not include roles & pets
	public UserDto(String principal, String firstName, String middleName, String lastName, String addressLine1, String addressLine2, String city, String state, String zip, String phoneNumber, String type) {
		this.principal = principal;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phoneNumber = phoneNumber;
		this.type = type;
	}

	public UserDto(String principal, String firstName, String middleName, String lastName, String addressLine1, String addressLine2, String city, String state, String zip, String phoneNumber, List<UserPetDto> pets, List<String> roles, String type) {
		this.principal = principal;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phoneNumber = phoneNumber;
		this.pets = pets;
		this.roles = roles;
		this.type = type;
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public List<UserPetDto> getPets() {
		return pets;
	}

	public void setPets(List<UserPetDto> pets) {
		this.pets = pets;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<String> getRoles() {
		return roles;
	}

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}

	@Override
	public String toString() {
		return "UserDto{" +
				"principal='" + principal + '\'' +
				", firstName='" + firstName + '\'' +
				", middleName='" + middleName + '\'' +
				", lastName='" + lastName + '\'' +
				", addressLine1='" + addressLine1 + '\'' +
				", addressLine2='" + addressLine2 + '\'' +
				", city='" + city + '\'' +
				", state='" + state + '\'' +
				", zip='" + zip + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", pets=" + pets +
				", roles=" + roles +
				", type='" + type + '\'' +
				'}';
	}
}
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
	private Long rating;

	private List<UserPetDto> pets;
	private List<String> roles;
	private String userType;

	private UserDto() {

	}

	//does not include roles & pets
	public UserDto(String principal, String firstName, String middleName, String lastName, String addressLine1, String addressLine2, String city, String state, String zip, String phoneNumber, String userType) {
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
		this.userType = userType;
	}

	public UserDto(String principal, String firstName, String middleName, String lastName, String addressLine1,
				   String addressLine2, String city, String state, String zip, String phoneNumber, Long rating,
				   List<UserPetDto> pets, List<String> roles, String userType) {
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
		this.rating = rating;
		this.pets = pets;
		this.roles = roles;
		this.userType = userType;
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getRating() {
		return rating;
	}

	public void setRating(Long rating) {
		this.rating = rating;
	}

	public List<UserPetDto> getPets() {
		return pets;
	}

	public void setPets(List<UserPetDto> pets) {
		this.pets = pets;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}

	public enum UserType {
		OWNER, SITTER
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
				", rating=" + rating +
				", pets=" + pets +
				", roles=" + roles +
				", userType='" + userType + '\'' +
				'}';
	}
}
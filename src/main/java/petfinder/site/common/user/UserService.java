package petfinder.site.common.user;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alloy.util.AlloyAuthentication;
import alloy.util.Wait;
import alloy.util._Lists;
import alloy.util._Maps;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserDto> findUser(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	// @TODO Add all fields for new registration
	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String userType;
		private String firstName;
		private String middleName;
		private String lastName;
		private String addressLine1;
		private String addressLine2;
		private String city;
		private String state;
		private String zip;
		private String phoneNumber;
		private Integer numRatings;
		private Integer sumRatings;
		private Long rating;

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getUserType() {
			return userType;
		}

		public void setUserType(String userType) {
			this.userType = userType;
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

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
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

		public void setNumRatings(Integer numRatings){ this.numRatings = numRatings; }

		public Integer getNumRatings(){ return this.numRatings; }

		public void setSumRatings(Integer sumRatings){ this.sumRatings = sumRatings; }

		public Integer getSumRatings(){ return sumRatings; }
	}

	// @TODO Add new stuff from new userAuthItem - NOT HARDCODED @brandon
	public UserDto register(RegistrationRequest request) {
		// The idea is that we process the request to create a new user
		// and let the user input non-essential data as they please.
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto( new UserDto( request.getPrincipal(),
						request.getFirstName(),
						request.getMiddleName(),
						request.getLastName(),
						request.getAddressLine1(),
						request.getAddressLine2(),
						request.getCity(),
						request.getState(),
						request.getZip(),
						request.getPhoneNumber(),
						_Lists.list(),
						_Lists.list("ROLE_USER"),
						request.getUserType(),
						0,
						0
				),
				passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);

		// @TODO Remove Debug
		System.out.println("REGISTERING USER!");
		System.out.println(userAuthentication.getUser().toString());

		return userAuthentication.getUser();
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public List<PetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}

	public void updateUser(RegistrationRequest request){
		System.out.println("In the UserService for updateUser");
		//userDao.updateUser(userDto);
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto( new UserDto(
					request.getPrincipal(),
					request.getFirstName(),
					request.getMiddleName(),
					request.getLastName(),
					request.getAddressLine1(),
					request.getAddressLine2(),
					request.getCity(),
					request.getState(),
					request.getZip(),
					request.getPhoneNumber(),
					_Lists.list(),
					_Lists.list("ROLE_USER"),
					request.getUserType(),
					request.getNumRatings(),
					request.getSumRatings()
				),
				passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
	}

	public void updateRating(RegistrationRequest request){
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto( new UserDto(
				request.getPrincipal(),
				request.getFirstName(),
				request.getMiddleName(),
				request.getLastName(),
				request.getAddressLine1(),
				request.getAddressLine2(),
				request.getCity(),
				request.getState(),
				request.getZip(),
				request.getPhoneNumber(),
				_Lists.list(),
				_Lists.list("ROLE_USER"),
				request.getUserType(),
				request.getNumRatings(),
				request.getSumRatings()
		),
				passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
	}
}
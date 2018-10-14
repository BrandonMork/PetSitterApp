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
import petfinder.site.common.user.UserDto.UserType;

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

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String userType;

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
	}

	public UserDto register(RegistrationRequest request) {
		// The idea is that we process the request to create a new user
		// and let the user input non-essential data as they please.
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto( new UserDto( request.getPrincipal(),
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						0,
						0,
						_Lists.list(),
						_Lists.list("ROLE_USER"),
						request.getUserType()),
				passwordEncoder.encode(request.getPassword()));

		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public List<PetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}

	public void updateUser(UserDto userDto){
		System.out.println("In the UserService for updateUser");
		userDao.updateUser(userDto);
	}
}
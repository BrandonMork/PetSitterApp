package petfinder.site.common.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Identifiable;
import alloy.util.Momento;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	// Principal identifier for this entity (Username)
	private String principal;
	// No clue
	private List<String> roles;
	// Sitter or Owner (enums down below)
	private UserType type;
	// No clue
	private Map<String, Object> attributes;

	private UserDto() {

	}

	public UserDto(String principal, List<String> roles, UserType type, Map<String, Object> attributes) {
		this.principal = principal;
		this.roles = roles;
		this.type = type;
		this.attributes = attributes;
	}

	// What does this mean?
	public String getPrincipal() {
		return principal;
	}

	// Why a list of roles? What is a role?
	public List<String> getRoles() {
		return roles;
	}

	// What sorts of attributes are there even? Help?
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public UserType getType() {
		return type;
	}

	@JsonIgnore
	@Override
	// No idea what this is, either. I've heard of momento before...
	// not sure what it is tho
	public String getMomento() {
		return principal;
	}

	public enum UserType {
		OWNER, SITTER
	}
}
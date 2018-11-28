package petfinder.site.common.user;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import petfinder.site.common.pet.PetDto;
import petfinder.site.elasticsearch.ActualUserElasticsearchRepository;
import petfinder.site.elasticsearch.PetElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;
import petfinder.site.elasticsearch.UserPetElasticsearchRepository;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class UserDao {
	@Autowired
	private UserElasticSearchRepository userRepository;

	@Autowired
	private UserPetElasticsearchRepository userPetRepository;

	@Autowired
	private PetElasticsearchRepository petRepository;

	@Autowired
	private ActualUserElasticsearchRepository actualUserElasticsearchRepository;

	public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		System.out.println(queryString);
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
		System.out.println("in the UserDao searching for " + principal);
		return userRepository.search(searchSourceBuilder).stream().findFirst();
	}

	public UserDto findUser(String principal){
		System.out.println("In the UserDao looking for " + principal);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		List<UserDto> users = actualUserElasticsearchRepository.search(searchSourceBuilder);
		System.out.println(users);
		return  users.get(0);
	}

	public void save(UserAuthenticationDto userAuthentication) {
		userRepository.save(userAuthentication);
	}

	public List<PetDto> findPets(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		List<UserPetDto> userPets = userPetRepository.search(searchSourceBuilder);
		return userPets.stream()
				.map(userPet -> petRepository.find(userPet.getPetId()).get())
				.collect(Collectors.toList());
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userPetRepository.save(userPetDto);
	}

	public void updateUser(UserDto userDto){
		System.out.println("In the UserDao for updateUser: " + userDto.toString());
		actualUserElasticsearchRepository.save(userDto);
	}
}
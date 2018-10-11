package petfinder.site.common.pet;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserPetDto;
import petfinder.site.elasticsearch.PetElasticsearchRepository;
import petfinder.site.elasticsearch.PetfinderElasticSearchClientProvider;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class PetDao {
	@Autowired
	private PetElasticsearchRepository petElasticsearchRepository;

	@Autowired
	private ElasticSearchClientProvider elasticSearchClientProvider;

	//call elasticsearch to get PetDto
	public Optional<PetDto> findPet(Long petID) {
		return petElasticsearchRepository.find(petID);
	}


	public Optional<PetDto> findPetLowTech(Long id) {
		RestHighLevelClient client = elasticSearchClientProvider.getClient();
		// Use the client to make your search and manually parse the results
		return Optional.empty();
	}

	//save petDto to elasticsearch
	public void save(PetDto pet) {
		petElasticsearchRepository.save(pet);
	}

	public List<PetDto> findPets(String principal) {
		System.out.println("I hit the PetDao and the principal is " + principal);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		//fix?
		//principal = "mario@xom.com";
		principal = principal + ".com";

		String queryString = String.format("principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		//get a list of Pets with the user's Principal
		List<PetDto> userPets = petElasticsearchRepository.search(searchSourceBuilder);
		System.out.println(userPets.toString());

		PetDto a = new PetDto("mario@xom.com","help me pls");
		PetDto b = new PetDto("mario@xom.com","here you go");
		List<PetDto> newList = new ArrayList<>();
		newList.add(a);
		newList.add(b);

		System.out.println(newList.toString());

		return userPets;

//		return userPets.stream()
//				.map(userPet -> petRepository.find(userPet.getPetId()).get())
//				.collect(Collectors.toList());
	}
}
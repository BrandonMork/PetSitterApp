package petfinder.site.common.pet;

import java.util.List;
import java.util.Optional;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.elasticsearch.PetElasticsearchRepository;

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
		System.out.println("In the PetDao with the id " + petID);
		return petElasticsearchRepository.find(petID);
	}


	// MIGHT DELETE THIS LATER?????
	public PetDto findOnePet(String principal, Long id) {
		System.out.println("In the PetDao with the id " + id + " with principal " + principal);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		// for some reason we dont need to fix the principal...
		//@Todo figure out why lol

		String queryString = String.format("principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		//get a list of Pets with the user's Principal
		List<PetDto> userPets = petElasticsearchRepository.search(searchSourceBuilder);
		PetDto foundPet = new PetDto();


		for(int i=0;i<userPets.size();i++){

			//round the left :(
			String roundMe = userPets.get(i).getId().toString();
			String finished = roundMe.substring(0,15);
			char c = roundMe.charAt(16);
			finished+=c;
			for (int j=0;j<3;j++)
				finished+='0';

			if(finished.equals(id.toString())) {
				foundPet = userPets.get(i);
				System.out.println("Found the pet! " + userPets.get(i));
				return foundPet;
			}
		}

		return foundPet;
	}

	// this will find the specific pet from the user
	public PetDto getOnePet(String principal, String name) {
		System.out.println("In the PetDao with name of  " + name + " with principal " + principal);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		// for some reason we dont need to fix the principal...
		//@Todo figure out why lol

		String queryString = String.format("principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		//get a list of Pets with the user's Principal
		List<PetDto> userPets = petElasticsearchRepository.search(searchSourceBuilder);

		for(int i=0;i<userPets.size();i++){
			userPets.get(i).toString();
			if(userPets.get(i).getName().equals(name)) {
				return userPets.get(i);
			}
		}

		System.out.println("couldnt find pet");
		PetDto error = new PetDto();
		return error;
	}

	//save petDto to elasticsearch
	public void save(PetDto pet) {
		System.out.println(pet.toString());
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

		return userPets;

	}

	public void upDatePet(PetDto pet){
		System.out.println("The id is " + pet.getId());
		PetDto deleteMe = getOnePet(pet.getPrincipal(),pet.getName());
		System.out.println(deleteMe.toString());
		petElasticsearchRepository.delete(deleteMe.getId());
		petElasticsearchRepository.save(pet);
	}

	public void deletePet(String principal, String name){
		PetDto deleteMe = getOnePet(principal,name);
		petElasticsearchRepository.delete(deleteMe.getId());
	}

}
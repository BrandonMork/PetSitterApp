package petfinder.site.common.pet;

import java.util.Map;
import java.util.Optional;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

import alloy.elasticsearch.ElasticSearchClientProvider;
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
}
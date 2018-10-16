package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class PetElasticsearchRepository extends ElasticSearchJsonRepository<PetDto, Long> {
	public PetElasticsearchRepository(ElasticSearchClientProvider provider) {
		//use this to add index for elasticsearch
		super(new ElasticSearchIndex(provider, "pet-info"), PetDto.class);
	}
}
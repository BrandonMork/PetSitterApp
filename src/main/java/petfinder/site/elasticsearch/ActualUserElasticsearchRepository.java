package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class ActualUserElasticsearchRepository extends ElasticSearchJsonRepository<UserDto, String> {
    public ActualUserElasticsearchRepository(ElasticSearchClientProvider provider) {
        //use this to add index for elasticsearch
        super(new ElasticSearchIndex(provider, "petfinder-users"), UserDto.class);
    }
}
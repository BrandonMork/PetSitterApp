package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.custom.CustomDto;
import petfinder.site.common.user.UserAuthenticationDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class CustomElasticsearchRepository extends ElasticSearchJsonRepository<CustomDto, Long> {
    public CustomElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-custom"), CustomDto.class);
    }
}
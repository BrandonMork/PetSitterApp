package petfinder.site.common.custom;

import java.util.Map;
import java.util.Optional;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.elasticsearch.CustomElasticsearchRepository;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class CustomDao {
    @Autowired
    private CustomElasticsearchRepository customElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<CustomDto> findPet(Long id) {
        return customElasticsearchRepository.find(id);
    }

    public Optional<CustomDto> findPetLowTech(Long id) {
        RestHighLevelClient client = elasticSearchClientProvider.getClient();
        // Use the client to make your search and manually parse the results
        return Optional.empty();
    }

    public void save(CustomDto custom) {
        customElasticsearchRepository.save(custom);
    }
}
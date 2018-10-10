package petfinder.site.common.job;

import java.util.Map;
import java.util.Optional;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.elasticsearch.JobElasticsearchRepository;
import petfinder.site.elasticsearch.PetfinderElasticSearchClientProvider;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class JobDao {
    @Autowired
    private JobElasticsearchRepository jobElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    //call elasticsearch to get PetDto
    public Optional<JobDto> findJob(Long jobID) {
        return jobElasticsearchRepository.find(jobID);
    }


    public Optional<JobDto> findPetLowTech(Long id) {
        RestHighLevelClient client = elasticSearchClientProvider.getClient();
        // Use the client to make your search and manually parse the results
        return Optional.empty();
    }

    //save petDto to elasticsearch
    public void save(JobDto job) {
        jobElasticsearchRepository.save(job);
    }
}
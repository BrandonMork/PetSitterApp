package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.job.JobDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class JobElasticsearchRepository extends ElasticSearchJsonRepository<JobDto, Long> {
    public JobElasticsearchRepository(ElasticSearchClientProvider provider) {
        //use this to add index for elasticsearch
        super(new ElasticSearchIndex(provider, "job-info"), JobDto.class);
    }
}
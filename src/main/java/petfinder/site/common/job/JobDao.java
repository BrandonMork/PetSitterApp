package petfinder.site.common.job;

import java.util.*;

import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.elasticsearch.JobElasticsearchRepository;

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
        System.out.println("In the JobDao for save with " + job.toString());
        jobElasticsearchRepository.save(job);
    }

    public JobDto getJob(String id) {
        System.out.println("I hit the JobDao and the id is " + id);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        //id = "-6702061221884714951";
        //String queryString = "id=" + id;
        String queryString = "jobID=\"" + id + "\"";
        System.out.println(queryString);

        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
        List<JobDto> temp = jobElasticsearchRepository.search(searchSourceBuilder);
        System.out.println(temp.toString());
        return temp.get(0);

    }

    public void update(JobDto job){
        Long tmp = new Long(job.getJobID());
        jobElasticsearchRepository.delete(tmp);
        jobElasticsearchRepository.delete(job.getId());
        jobElasticsearchRepository.save(job);
    }

    public void quitJob(String jobID, Long id){
        Long tmp = new Long(jobID);
        jobElasticsearchRepository.delete(tmp);
        jobElasticsearchRepository.delete(id);
    }

//    public JobDto(Long id, Long ownerID, Long sitterID, String pets, Date startDate, Date endDate) {
//        this.id = id;
//        this.ownerID = ownerID;
//        this.sitterID = sitterID;
//        this.pets = pets;
//        this.startDate = startDate;
//        this.endDate = endDate;
//    }
}
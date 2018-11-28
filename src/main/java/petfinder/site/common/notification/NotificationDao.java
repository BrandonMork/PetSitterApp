package petfinder.site.common.notification;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.*;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class NotificationDao {
    @Autowired
    private NotificationElasticsearchRepository notificationElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    //call elasticsearch to get PetDto
    public Optional<NotificationDto> findJob(Long jobID) {
        return notificationElasticsearchRepository.find(jobID);
    }


    public Optional<NotificationDto> findPetLowTech(Long id) {
        RestHighLevelClient client = elasticSearchClientProvider.getClient();
        // Use the client to make your search and manually parse the results
        return Optional.empty();
    }

    //save petDto to elasticsearch
    public void save(NotificationDto job) {
        System.out.println("In the JobDao for save with " + job.toString());
        notificationElasticsearchRepository.save(job);
    }

    public NotificationDto getJob(String id) {
        System.out.println("I hit the JobDao and the id is " + id);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        //id = "-6702061221884714951";
        //String queryString = "id=" + id;
        String queryString = "jobID=\"" + id + "\"";
        System.out.println(queryString);

        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
        List<NotificationDto> temp = notificationElasticsearchRepository.search(searchSourceBuilder);
        System.out.println(temp.toString());
        return temp.get(0);

    }

    public void update(NotificationDto job){
        //Long tmp = new Long(job.getJobID());
        //notificationElasticsearchRepository.delete(tmp);
        //notificationElasticsearchRepository.save(job);
    }

}
package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.notification.NotificationDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class NotificationElasticsearchRepository extends ElasticSearchJsonRepository<NotificationDto, Long> {
    public NotificationElasticsearchRepository(ElasticSearchClientProvider provider) {
        //use this to add index for elasticsearch
        super(new ElasticSearchIndex(provider, "notification-info"), NotificationDto.class);
    }
}

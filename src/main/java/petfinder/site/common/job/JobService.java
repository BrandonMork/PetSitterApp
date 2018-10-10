package petfinder.site.common.job;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class JobService {
    @Autowired
    private JobDao jobDao;

    //Calls JobDto findPet() function to search in elasticsearch
    public Optional<JobDto> findPet(Long id) {
        return jobDao.findJob(id);
    }

    //Calls JobDto Save() function to save to elasticsearch
    public void save(JobDto jobExample) {
        jobDao.save(jobExample);
    }
}
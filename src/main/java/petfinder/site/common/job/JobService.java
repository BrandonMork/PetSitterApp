package petfinder.site.common.job;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class JobService {
    @Autowired
    private JobDao jobDao;

    //Calls JobDto Save() function to save to elasticsearch
    public void save(JobDto jobExample) {
        System.out.println("In the JobService for save" + jobExample.toString() + ".");
        jobDao.save(jobExample);
    }

    public JobDto getJob(String id) {
        System.out.println("I hit the JobService for getJob and the id is " + id);
        return jobDao.getJob(id);
    }
}
package petfinder.site.common.job;

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
}
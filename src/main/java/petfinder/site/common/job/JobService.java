package petfinder.site.common.job;

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

    public void update(JobDto jobExample) {
        System.out.println("In the JobService for update" + jobExample.toString() + ".");
        jobDao.update(jobExample);
    }

    public JobDto getJob(String id) {
        System.out.println("I hit the JobService for getJob and the id is " + id);
        return jobDao.getJob(id);
    }

    public void quitJob(String jobID, Long id){
        jobDao.quitJob(jobID,id);
    }
}
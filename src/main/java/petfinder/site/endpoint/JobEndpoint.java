package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.job.JobDto;
import petfinder.site.common.job.JobService;


/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping("/api/jobs")
public class JobEndpoint {

    @Autowired
    private JobService jobService;

    @PostMapping(value = "/post-job")
    public JobDto postJob(@RequestBody JobDto job) {
        System.out.println("In the JobEndpoint for postJob" + job.toString());
        jobService.save(job);
        return job;
    }

}

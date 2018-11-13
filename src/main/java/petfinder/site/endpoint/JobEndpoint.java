package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.job.JobDto;
import petfinder.site.common.job.JobService;

import java.util.List;


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

    @GetMapping(value = "/get-job/{id}")
    public JobDto getJob(@PathVariable("id") Long id) {
        System.out.println("In the JobEndpoint for getJob " + id);
        return jobService.getJob(id);
    }

}

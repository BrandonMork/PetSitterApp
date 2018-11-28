package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.job.JobDto;
import petfinder.site.common.job.JobService;

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

    @PostMapping(value = "/update-job")
    public JobDto updateJob(@RequestBody JobDto job) {
        System.out.println("In the JobEndpoint for updateJob" + job.toString());
        jobService.update(job);
        return job;
    }

    @GetMapping(value = "/get-job/{id}")
    public JobDto getJob(@PathVariable("id") String id) {
        System.out.println("In the JobEndpoint for getJob " + id);
        return jobService.getJob(id);
    }

    @PostMapping(value = "/quit-job/{jobID}/{id}")
    public void quitJob(@PathVariable("jobID") String jobID, @PathVariable("id") Long id){
        System.out.println("In the JobEndpoint for quitJob " + jobID + " " + id);
        jobService.quitJob(jobID,id);
    }

}

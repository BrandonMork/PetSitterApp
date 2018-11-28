package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.notification.NotificationService;


/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping("/api/notification")
public class NotificationEndpoint {

    @Autowired
    private NotificationService notificationService;

    @PostMapping(value = "/post-notification")
    public NotificationDto postNotification(@RequestBody NotificationDto notification) {
        System.out.println("In the NotificationEndpoint for postNotification" + notification.toString());
        notificationService.save(notification);
        return notification;
    }

    @PostMapping(value = "/update-notification")
    public NotificationDto updateJob(@RequestBody NotificationDto notification) {
        System.out.println("In the NotificationEndpoint for updateNotification" + notification.toString());
        notificationService.update(notification);
        return notification;
    }

    @GetMapping(value = "/get-notification/{id}")
    public NotificationDto getJob(@PathVariable("id") String id) {
        System.out.println("In the NotificationEndpoint for getNotification " + id);
        return notificationService.getNotifcation(id);
    }

}

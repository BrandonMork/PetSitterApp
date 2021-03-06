package petfinder.site.common.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private NotificationDao notificationDao;

    public void save(NotificationDto jobExample) {
        System.out.println("In the NotificationService for save" + jobExample.toString() + ".");
        notificationDao.save(jobExample);
    }

    public void delete(Long id, String notifyID){
        notificationDao.delete(id, notifyID);
    }

    public void update(NotificationDto jobExample) {
        System.out.println("In the NotificationService for update" + jobExample.toString() + ".");
        notificationDao.update(jobExample);
    }

    public NotificationDto getNotifcation(String id) {
        System.out.println("I hit the NotificationService for getNotifcation and the id is " + id);
        return notificationDao.getJob(id);
    }
}
package petfinder.site.common.notification;

import java.util.UUID;
import alloy.util.Identifiable;

public class NotificationDto implements Identifiable {
    private Long id;
    private String notifyID;
    private String senderPrincipal;
    private String receiverPrincipal;
    private String message;
    private String read;

    public NotificationDto(){
        this.id = UUID.randomUUID().getLeastSignificantBits();
        this.notifyID = id.toString();
    }

    public NotificationDto(Long id, String notifyID, String senderPrincipal, String receiverPrincipal, String message, String read) {
        this.id = id;
        this.notifyID = notifyID;
        this.senderPrincipal = senderPrincipal;
        this.receiverPrincipal = receiverPrincipal;
        this.message = message;
        this.read = read;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotifyID() {
        return notifyID;
    }

    public void setNotifyID(String notifyID) {
        this.notifyID = notifyID;
    }

    public String getSenderPrincipal() {
        return senderPrincipal;
    }

    public void setSenderPrincipal(String senderPrincipal) {
        this.senderPrincipal = senderPrincipal;
    }

    public String getReceiverPrincipal() {
        return receiverPrincipal;
    }

    public void setReceiverPrincipal(String receiverPrincipal) {
        this.receiverPrincipal = receiverPrincipal;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRead() {
        return read;
    }

    public void setRead(String read) {
        this.read = read;
    }

    @Override
    public String toString() {
        return "NotificationDto{" +
                "id=" + id +
                ", notifyID='" + notifyID + '\'' +
                ", senderPrincipal='" + senderPrincipal + '\'' +
                ", receiverPrincipal='" + receiverPrincipal + '\'' +
                ", message='" + message + '\'' +
                ", read='" + read + '\'' +
                '}';
    }
}

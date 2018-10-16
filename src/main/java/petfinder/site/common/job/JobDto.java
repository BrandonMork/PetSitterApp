package petfinder.site.common.job;
import java.util.Date;
import java.util.UUID;
import alloy.util.Identifiable;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class JobDto implements Identifiable {
    private Long id;
    private Long ownerID;
    private Long sitterID;

    //not sure how to pull array from elasticsearch
    private String pets;

    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    private String location;
    private Long maxPay;

    // @TODO Address
    private String hosting;
    private String reccuring;


    // @TODO Define what our types will be
    // i.e. Breed, Species, Size, Age, etc....
    // Will have more defined attributes as we go on

    public JobDto() {
        this.id = UUID.randomUUID().getMostSignificantBits();
    }

    public JobDto(Long id, Long ownerID, Long sitterID, String pets, Date startDate, Date endDate, String startTime, String endTime, String location, Long maxPay, String hosting, String reccuring) {
        this.id = id;
        this.ownerID = ownerID;
        this.sitterID = sitterID;
        this.pets = pets;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.maxPay = maxPay;
        this.hosting = hosting;
        this.reccuring = reccuring;
    }

    public JobDto(Long id, Long ownerID, Long sitterID, String pets, Date startDate, Date endDate) {
        this.id = id;
        this.ownerID = ownerID;
        this.sitterID = sitterID;
        this.pets = pets;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public Long getSitterID() {
        return sitterID;
    }

    public void setSitterID(Long sitterID) {
        this.sitterID = sitterID;
    }

    public String getPets() {
        return pets;
    }

    public void setPets(String pets) {
        this.pets = pets;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getMaxPay() {
        return maxPay;
    }

    public void setMaxPay(Long maxPay) {
        this.maxPay = maxPay;
    }

    public String getHosting() {
        return hosting;
    }

    public void setHosting(String hosting) {
        this.hosting = hosting;
    }

    public String getReccuring() {
        return reccuring;
    }

    public void setReccuring(String reccuring) {
        this.reccuring = reccuring;
    }

    @Override
    public String toString() {
        return "JobDto{" +
                "id=" + id +
                ", ownerID=" + ownerID +
                ", sitterID=" + sitterID +
                ", pets='" + pets + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", location='" + location + '\'' +
                ", maxPay=" + maxPay +
                ", hosting='" + hosting + '\'' +
                ", reccuring='" + reccuring + '\'' +
                '}';
    }
}
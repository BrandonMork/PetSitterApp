package petfinder.site.common.job;
import java.util.Date;
import java.util.UUID;
import alloy.util.Identifiable;

import static java.util.UUID.randomUUID;

/**
 * Created by jlutteringer on 8/23/17.
 */

// @TODO Job Title and Description (String) to be added
public class JobDto implements Identifiable {
    private Long id;
    private String jobID;
    private String ownerPrincipal;
    private String sitterPrincipal;

    //not sure how to pull array from elasticsearch
    private String pets;

    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private Long maxPay;

    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zip;

    private String accepted;


    // @TODO Define what our types will be
    // i.e. Breed, Species, Size, Age, etc....
    // Will have more defined attributes as we go on

    public JobDto() {
        this.id = UUID.randomUUID().getLeastSignificantBits();
        this.jobID = id.toString();
    }

    public JobDto(Long id, String jobID, String ownerPrincipal, String sitterPrincipal, String pets, String startDate, String endDate, String startTime, String endTime, Long maxPay, String addressLine1, String addressLine2, String city, String state, String zip, String accepted) {
        this.id = id;
        this.jobID = jobID;
        this.ownerPrincipal = ownerPrincipal;
        this.sitterPrincipal = sitterPrincipal;
        this.pets = pets;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxPay = maxPay;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.accepted = accepted;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobID() {
        return jobID;
    }

    public void setJobID(String jobID) {
        this.jobID = jobID;
    }

    public String getOwnerPrincipal() {
        return ownerPrincipal;
    }

    public void setOwnerPrincipal(String ownerPrincipal) {
        this.ownerPrincipal = ownerPrincipal;
    }

    public String getSitterPrincipal() {
        return sitterPrincipal;
    }

    public void setSitterPrincipal(String sitterPrincipal) {
        this.sitterPrincipal = sitterPrincipal;
    }

    public String getPets() {
        return pets;
    }

    public void setPets(String pets) {
        this.pets = pets;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
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

    public Long getMaxPay() {
        return maxPay;
    }

    public void setMaxPay(Long maxPay) {
        this.maxPay = maxPay;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getAccepted() {
        return accepted;
    }

    public void setAccepted(String accepted) {
        this.accepted = accepted;
    }

    @Override
    public String toString() {
        return "JobDto{" +
                "id=" + id +
                ", jobID='" + jobID + '\'' +
                ", ownerPrincipal='" + ownerPrincipal + '\'' +
                ", sitterPrincipal='" + sitterPrincipal + '\'' +
                ", pets='" + pets + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", maxPay=" + maxPay +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", accepted='" + accepted + '\'' +
                '}';
    }
}
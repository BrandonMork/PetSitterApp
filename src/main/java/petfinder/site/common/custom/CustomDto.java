package petfinder.site.common.custom;

import alloy.util.Identifiable;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class CustomDto implements Identifiable {
    private Long id;
    private String name;
    private String type;

    public CustomDto(Long id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
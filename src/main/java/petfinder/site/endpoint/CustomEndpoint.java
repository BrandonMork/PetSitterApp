package petfinder.site.endpoint;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.custom.CustomDto;
import petfinder.site.common.custom.CustomService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping("/api/custom")
public class CustomEndpoint {
    @Autowired
    private CustomService customService;

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<CustomDto> getCustom(@PathVariable("id") Long id) {
        return customService.findCustom(id);
    }

    @PostMapping(produces = "application/json")
    public CustomDto savePet(@RequestBody CustomDto custom) {
        customService.save(custom);
        return custom;
    }
}

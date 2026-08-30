package com.pennypilot.controller;

import com.pennypilot.entity.Goal;
import com.pennypilot.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = {"http://localhost:5173", "https://pennypilot-amber.vercel.app"})
public class GoalController {

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    @PostMapping
    public Goal save(@RequestBody Goal goal) {
        return service.save(goal);
    }

    @GetMapping
    public List<Goal> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Goal update(
            @PathVariable Long id,
            @RequestBody Goal goal
    ) {
        return service.update(id, goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
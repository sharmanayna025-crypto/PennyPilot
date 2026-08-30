package com.pennypilot.controller;

import com.pennypilot.dto.BudgetProgressDTO;
import com.pennypilot.entity.Budget;
import com.pennypilot.service.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
@CrossOrigin(origins = {"http://localhost:5173", "https://pennypilot-amber.vercel.app"})
public class BudgetController {

    private final BudgetService service;

    public BudgetController(BudgetService service) {
        this.service = service;
    }

    @PostMapping
    public Budget save(@RequestBody Budget budget) {
        return service.save(budget);
    }

    @GetMapping
    public List<Budget> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/progress")
    public List<BudgetProgressDTO> getProgress() {
        return service.getProgress();
    }
}
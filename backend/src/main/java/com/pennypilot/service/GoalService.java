package com.pennypilot.service;

import com.pennypilot.entity.Goal;
import com.pennypilot.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository repository;

    public GoalService(GoalRepository repository) {
        this.repository = repository;
    }

    public Goal save(Goal goal) {

        if (goal.getTargetAmount() == null ||
                goal.getTargetAmount() <= 0) {

            throw new RuntimeException(
                    "Target amount must be greater than 0"
            );
        }

        if (goal.getSavedAmount() == null) {
            goal.setSavedAmount(0.0);
        }

        if (goal.getSavedAmount() < 0) {
            goal.setSavedAmount(0.0);
        }

        return repository.save(goal);
    }

    public List<Goal> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Goal update(Long id, Goal goal) {

        Goal existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found")
                );

        if (goal.getTargetAmount() == null ||
                goal.getTargetAmount() <= 0) {

            throw new RuntimeException(
                    "Target amount must be greater than 0"
            );
        }

        existing.setName(goal.getName());
        existing.setTargetAmount(goal.getTargetAmount());

        if (goal.getSavedAmount() == null) {
            existing.setSavedAmount(0.0);
        } else {
            existing.setSavedAmount(
                    Math.max(goal.getSavedAmount(), 0.0)
            );
        }

        return repository.save(existing);
    }
}
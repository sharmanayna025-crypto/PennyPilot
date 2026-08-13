package com.pennypilot.repository;

import com.pennypilot.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository
        extends JpaRepository<Goal, Long> {
}
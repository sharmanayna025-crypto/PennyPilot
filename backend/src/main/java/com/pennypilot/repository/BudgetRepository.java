package com.pennypilot.repository;

import com.pennypilot.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository
        extends JpaRepository<Budget, Long> {
}
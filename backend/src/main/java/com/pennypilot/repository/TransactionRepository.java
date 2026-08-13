package com.pennypilot.repository;

import com.pennypilot.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    @Query("""
            SELECT t FROM Transaction t
            WHERE LOWER(t.type) = 'expense'
            AND t.category = :category
            """)
    List<Transaction> findExpenseByCategory(String category);

    boolean existsByExternalId(String externalId);
}
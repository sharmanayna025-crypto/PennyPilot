package com.pennypilot.service.impl;

import com.pennypilot.entity.Transaction;
import com.pennypilot.repository.TransactionRepository;
import com.pennypilot.service.TransactionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;

    public TransactionServiceImpl(
            TransactionRepository repository
    ) {
        this.repository = repository;
    }

    @Override
    public Transaction addTransaction(
            Transaction transaction
    ) {

        // Always store transaction type in lowercase
        if (transaction.getType() != null) {
            transaction.setType(
                    transaction.getType().toLowerCase()
            );
        }

        return repository.save(transaction);
    }

    @Override
    public Transaction addImportedTransaction(
            Transaction transaction
    ) {

        // Always store imported transaction type in lowercase
        if (transaction.getType() != null) {
            transaction.setType(
                    transaction.getType().toLowerCase()
            );
        }

        // Check whether this bank transaction
        // has already been imported
        if (
                transaction.getExternalId() != null &&
                        repository.existsByExternalId(
                                transaction.getExternalId()
                        )
        ) {
            return null;
        }

        return repository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @Override
    public void deleteTransaction(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Transaction updateTransaction(
            Long id,
            Transaction transaction
    ) {

        Transaction existing =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found"
                                )
                        );

        existing.setTitle(
                transaction.getTitle()
        );

        existing.setAmount(
                transaction.getAmount()
        );

        // Always store updated type in lowercase
        if (transaction.getType() != null) {
            existing.setType(
                    transaction.getType().toLowerCase()
            );
        }

        existing.setCategory(
                transaction.getCategory()
        );

        existing.setDate(
                transaction.getDate()
        );

        return repository.save(existing);
    }
}
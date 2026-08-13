package com.pennypilot.service;

import com.pennypilot.entity.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction addTransaction(Transaction transaction);

    Transaction addImportedTransaction(Transaction transaction);

    List<Transaction> getAllTransactions();

    void deleteTransaction(Long id);

    Transaction updateTransaction(Long id, Transaction transaction);
}
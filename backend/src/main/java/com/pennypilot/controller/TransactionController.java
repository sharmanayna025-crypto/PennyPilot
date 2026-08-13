package com.pennypilot.controller;

import com.pennypilot.entity.Transaction;
import com.pennypilot.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService
    ) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction addTransaction(
            @RequestBody Transaction transaction
    ) {
        return transactionService.addTransaction(transaction);
    }

    @PostMapping("/import")
    public Transaction importTransaction(
            @RequestBody Transaction transaction
    ) {
        return transactionService.addImportedTransaction(transaction);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(
            @PathVariable Long id
    ) {
        transactionService.deleteTransaction(id);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction
    ) {
        return transactionService.updateTransaction(
                id,
                transaction
        );
    }
}
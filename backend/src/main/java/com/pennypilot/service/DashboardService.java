package com.pennypilot.service;

import com.pennypilot.dto.DashboardSummaryDTO;
import com.pennypilot.entity.Transaction;
import com.pennypilot.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public DashboardSummaryDTO getSummary() {

        List<Transaction> transactions = transactionRepository.findAll();

        double totalIncome = transactions.stream()
                .filter(t -> "INCOME".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpense = transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;

        long transactionCount = transactions.size();

        return new DashboardSummaryDTO(
                totalIncome,
                totalExpense,
                balance,
                transactionCount
        );
    }
}
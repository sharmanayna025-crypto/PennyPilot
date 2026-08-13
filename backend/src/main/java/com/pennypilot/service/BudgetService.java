package com.pennypilot.service;

import com.pennypilot.dto.BudgetProgressDTO;
import com.pennypilot.entity.Budget;
import com.pennypilot.entity.Transaction;
import com.pennypilot.repository.BudgetRepository;
import com.pennypilot.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            TransactionRepository transactionRepository
    ) {
        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionRepository;
    }

    public Budget save(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getAll() {
        return budgetRepository.findAll();
    }

    public void delete(Long id) {
        budgetRepository.deleteById(id);
    }

    public List<BudgetProgressDTO> getProgress() {

        return budgetRepository.findAll()
                .stream()
                .map(budget -> {

                    List<Transaction> transactions =
                            transactionRepository.findExpenseByCategory(
                                    budget.getCategory()
                            );

                    double spentAmount =
                            transactions.stream()
                                    .filter(transaction ->
                                            transaction.getAmount() != null
                                    )
                                    .mapToDouble(Transaction::getAmount)
                                    .sum();

                    double limitAmount =
                            budget.getLimitAmount() != null
                                    ? budget.getLimitAmount()
                                    : 0.0;

                    double percentage = 0.0;

                    if (limitAmount > 0) {
                        percentage =
                                (spentAmount / limitAmount) * 100;
                    }

                    return new BudgetProgressDTO(
                            budget.getCategory(),
                            limitAmount,
                            spentAmount,
                            percentage
                    );
                })
                .toList();
    }
}
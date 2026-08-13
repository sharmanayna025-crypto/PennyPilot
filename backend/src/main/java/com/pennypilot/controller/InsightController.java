package com.pennypilot.controller;

import com.pennypilot.entity.Transaction;
import com.pennypilot.service.GeminiService;
import com.pennypilot.service.TransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/insights")
public class InsightController {

    private final GeminiService geminiService;
    private final TransactionService transactionService;

    public InsightController(
            GeminiService geminiService,
            TransactionService transactionService) {

        this.geminiService = geminiService;
        this.transactionService = transactionService;
    }

    @GetMapping
    public String getInsight() {

        System.out.println(">>> InsightController reached <<<");

        List<Transaction> transactions =
                transactionService.getAllTransactions();

        if (transactions.isEmpty()) {
            return "No transactions available to generate insights.";
        }

        StringBuilder financialData = new StringBuilder();

        for (Transaction transaction : transactions) {

            financialData.append("Title: ")
                    .append(transaction.getTitle())
                    .append(", Amount: ₹")
                    .append(transaction.getAmount())
                    .append(", Type: ")
                    .append(transaction.getType())
                    .append(", Category: ")
                    .append(transaction.getCategory())
                    .append(", Date: ")
                    .append(transaction.getDate())
                    .append("\n");
        }

        System.out.println("Transactions sent to Gemini:");
        System.out.println(financialData);

        return geminiService.generateInsight(
                financialData.toString()
        );
    }
}

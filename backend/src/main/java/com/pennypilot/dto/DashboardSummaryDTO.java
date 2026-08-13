package com.pennypilot.dto;

public class DashboardSummaryDTO {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;
    private Long transactionCount;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(
            Double totalIncome,
            Double totalExpense,
            Double balance,
            Long transactionCount) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.transactionCount = transactionCount;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Long getTransactionCount() {
        return transactionCount;
    }

    public void setTransactionCount(Long transactionCount) {
        this.transactionCount = transactionCount;
    }

}

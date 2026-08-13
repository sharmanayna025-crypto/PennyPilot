package com.pennypilot.dto;

public class BudgetProgressDTO {


    private String category;
    private Double limitAmount;
    private Double spentAmount;
    private Double percentage;

    public BudgetProgressDTO(
            String category,
            Double limitAmount,
            Double spentAmount,
            Double percentage
    ) {
        this.category = category;
        this.limitAmount = limitAmount;
        this.spentAmount = spentAmount;
        this.percentage = percentage;
    }

    public String getCategory() {
        return category;
    }

    public Double getLimitAmount() {
        return limitAmount;
    }

    public Double getSpentAmount() {
        return spentAmount;
    }

    public Double getPercentage() {
        return percentage;
    }


}

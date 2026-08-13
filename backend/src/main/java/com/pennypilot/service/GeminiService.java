package com.pennypilot.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService(
            @Value("${gemini.api.key}") String apiKey
    ) {

        System.out.println(">>> Initializing Gemini Service <<<");

        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        System.out.println(">>> Gemini Client initialized <<<");
    }


    public String generateInsight(String financialData) {

        System.out.println(">>> Gemini generateInsight() started <<<");


        String prompt = """
                You are a personal finance advisor.

                Analyze the following financial transactions.

                Give 4-5 useful and practical spending insights.

                Focus on:
                - spending patterns
                - highest spending categories
                - unnecessary or repeated spending
                - savings opportunities
                - useful budgeting suggestions

                Keep the response concise and easy to understand.

                Financial Data:
                %s
                """.formatted(financialData);


        try {

            System.out.println(">>> Sending request to Gemini <<<");


            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-flash-latest",
                            prompt,
                            null
                    );


            System.out.println(">>> Gemini response received <<<");


            String result = response.text();


            System.out.println(">>> Gemini response: <<<");
            System.out.println(result);


            return result;


        } catch (Exception e) {

            System.out.println(">>> GEMINI ERROR <<<");

            e.printStackTrace();

            return "Unable to generate AI insights right now. Please try again.";

        }

    }

}
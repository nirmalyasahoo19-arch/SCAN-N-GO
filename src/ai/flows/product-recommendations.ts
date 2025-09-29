// src/ai/flows/product-recommendations.ts
'use server';

/**
 * @fileOverview Provides product recommendations based on scanned items.
 *
 * - getProductRecommendations - A function that retrieves product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  scannedItems: z
    .array(z.string())
    .describe('An array of product identifiers (e.g., barcode numbers) of items scanned by the user.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z.array(z.string()).describe('An array of product identifiers (e.g., barcode numbers) that are recommended to the user.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant. A user has scanned the following items:

{{#each scannedItems}}
- {{{this}}}
{{/each}}

Based on these items, recommend other products that the user might be interested in. Respond with a list of product identifiers (e.g., barcode numbers). Do not include any explanation.
`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

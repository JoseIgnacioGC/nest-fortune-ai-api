print("[LOG] Importing necessary ai libraries...")

from typing import TYPE_CHECKING, cast
from transformers.pipelines import pipeline  # type: ignore
from concurrent.futures import ThreadPoolExecutor
import torch
import asyncio

if TYPE_CHECKING:
    from transformers.pipelines.base import Pipeline

CPU_DEVICE = -1
GPT_2_PADDING_TOKEN = 50256


class TextGenerator:
    __generator: "Pipeline"
    __executor: ThreadPoolExecutor

    def __init__(self, max_workers: int) -> None:
        print("[LOG] Initializing TextGenerator...")
        self.__generator = pipeline(
            task="text-generation",
            model="distilgpt2",
            device=CPU_DEVICE,
            pad_token_id=GPT_2_PADDING_TOKEN,
            torch_dtype=torch.bfloat16,
        )
        self.__executor = ThreadPoolExecutor(max_workers=max_workers)

    def __generate_text_sync(self, prompt: str, max_length: int = 50) -> str:
        try:
            output = cast(
                list[dict[str, str]],
                self.__generator(
                    prompt,
                    max_new_tokens=max_length,
                    temperature=0.7,
                    top_k=50,
                    top_p=0.95,
                    do_sample=True,
                    truncation=True,
                    num_return_sequences=1,
                ),
            )

            return output[0]["generated_text"].strip()

        except Exception as e:
            print(f"[LOG] Error during text generation: {e}")
            return ""

    async def generate_normal_text(self, prompt: str, max_length: int = 50) -> str:
        print("[LOG] Generating text with prompt:", prompt)
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            self.__executor, self.__generate_text_sync, prompt, max_length
        )

    def print_model_info(self) -> None:
        print("Model Information:")
        print(f"Model: {self.__generator.model.config}")
        print(f"Tokenizer: {self.__generator.tokenizer}")


if __name__ == "__main__":
    # Example usage
    async def main():
        prompts = [
            "Once upon a time",
            "In a galaxy far, far away",
            "The future of AI is",
            "A journey through the mountains",
        ]
        generator = TextGenerator(4)
        print("Generating text for prompts:\n")

        # Create all tasks at once
        tasks = (generator.generate_normal_text(prompt) for prompt in prompts)

        # Run all tasks in parallel
        results = await asyncio.gather(*tasks)

        # Print results after all are complete
        for i, (prompt, result) in enumerate(zip(prompts, results), 1):
            words_count = len(result.split())
            print(f"=== Text {i} ===")
            print(f"Prompt: {prompt}")
            print(f"Total words: {words_count}")
            print("Generated text:")
            print(result)
            print()

    asyncio.run(main())


# from transformers import AutoTokenizer, pipeline
# from optimum.onnxruntime import ORTModelForSeq2SeqLM

# # Load the tokenizer and model
# tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
# model = ORTModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")

# # Create a pipeline for text-to-text generation
# text2text_pipeline = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

# # Example usage
# input_text = "Translate English to French: The weather is nice today."
# output = text2text_pipeline(input_text)
# print(output[0]['generated_text'])

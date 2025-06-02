from typing import TYPE_CHECKING, cast
from transformers.pipelines import pipeline  # type: ignore
import torch

if TYPE_CHECKING:
    from transformers.pipelines.base import Pipeline

CPU_DEVICE = -1
GPT_2_PADDING_TOKEN = 50256


class TextGenerator:
    __generator: "Pipeline"

    def __init__(self):
        print("[LOG] Initializing TextGenerator...")
        self.__generator = pipeline(
            task="text-generation",
            model="distilgpt2",
            device=CPU_DEVICE,
            pad_token_id=GPT_2_PADDING_TOKEN,
            torch_dtype=torch.bfloat16,
        )

    def generate_normal_text(self, prompt: str, max_length: int = 50) -> str:
        print("[LOG] Generating text with prompt:", prompt)
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

    def print_model_info(self) -> None:
        print("Model Information:")
        print(f"Model: {self.__generator.model.config}")
        print(f"Tokenizer: {self.__generator.tokenizer}")


if __name__ == "__main__":
    # Example usage
    prompts = [
        "Once upon a time",
        "In a galaxy far, far away",
        "The future of AI is",
        "A journey through the mountains",
    ]
    generator = TextGenerator()
    print("Generating text for prompts:\n")
    for i, prompt in enumerate(prompts, 1):
        result = generator.generate_normal_text(prompt)
        words_count = len(result.split())

        print(f"=== Text {i} ===")
        print(f"Prompt: {prompt}")
        print(f"Total words: {words_count}")
        print("Generated text:")
        print(result)
        print()

    # generator.print_model_info()

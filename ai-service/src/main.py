import grpc
from typing import Any
from concurrent import futures

import ai_service.ai_service_pb2 as pb2
import ai_service.ai_service_pb2_grpc as pb2_grpc
from model.model import TextGenerator

text_generator = TextGenerator()


class AiService(pb2_grpc.AiServiceServicer):
    def GenerateFortune(
        self, request: pb2.GenerateRequest, context: grpc.ServicerContext
    ) -> Any:
        prompt: str = request.prompt
        response: str = text_generator.generate_normal_text(prompt)
        return pb2.GenerateResponse(response)


def serve() -> None:
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_AiServiceServicer_to_server(AiService(), server)
    server.add_insecure_port("[::]:3005")
    server.start()
    print(f"[LOG] Server started on port 3005")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()

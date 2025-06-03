import grpc
import asyncio
from concurrent import futures

import ai_service.ai_service_pb2 as pb2
import ai_service.ai_service_pb2_grpc as pb2_grpc
from model.model import TextGenerator

MAX_AI_WORKERS = 2
MAX_SERVER_WORKERS = 2

text_generator = TextGenerator(max_workers=MAX_AI_WORKERS)


class AiService(pb2_grpc.AiServiceServicer):
    async def GenerateFortune(
        self, request: pb2.GenerateRequest, context: grpc.ServicerContext
    ) -> pb2.GenerateResponse:
        prompt: str = request.prompt
        response: str = await text_generator.generate_normal_text(prompt)
        print("[LOG] Response generated")
        return pb2.GenerateResponse(response=response)


async def serve() -> None:
    LISTEN_ADDRESS = "[::]:3005"

    server = grpc.aio.server(
        futures.ThreadPoolExecutor(max_workers=MAX_SERVER_WORKERS),
        options=[
            ("grpc.max_send_message_length", 100 * 1024 * 1024),
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
        ],
    )
    pb2_grpc.add_AiServiceServicer_to_server(AiService(), server)
    server.add_insecure_port(LISTEN_ADDRESS)

    print(f"[LOG] Server started on port {LISTEN_ADDRESS}")
    await server.start()
    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(serve())

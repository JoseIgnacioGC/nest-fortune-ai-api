define execute_in_new_window
	@pwsh -Command "\
		Start-Process pwsh -ArgumentList '-NoExit', '-Command', \
		'$(1)' \
		"\
endef

generate-all:
	@echo "Generating all files..."
	$(call execute_in_new_window, cd ./backend; pnpm install; pnpm run prisma)
	$(call execute_in_new_window, cd ./ai-service; poetry install; poetry env activate; poetry run poe grpc_generate)

start-backend:
	@echo "Starting backend service..."
	$(call execute_in_new_window, cd ./backend; pnpm run start)

start-ai-service:
	@echo "Starting AI service..."
	$(call execute_in_new_window, cd ./ai-service; poetry env activate; poetry run poe start)

start-all: 
	@echo "Starting all services..."
	$(MAKE) start-backend
	$(MAKE) start-ai-service

db-open:
	@echo "Opening database..."
	$(call execute_in_new_window, cd ./backend; pnpm run prisma:db)

.PHONY: generate-all start-all start-backend start-ai-service db-open
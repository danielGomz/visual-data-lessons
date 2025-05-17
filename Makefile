#################################################################################
# GLOBALS                                                                       #
#################################################################################

PROJECT_NAME = visual-data-lessons
PYTHON_INTERPRETER = python

#################################################################################
# ENVIRONMENT MANAGEMENT                                                        #
#################################################################################

## Create conda environment from environment.yml
.PHONY: create_environment
create_environment:
	conda env create -f environment.yml
	@echo ">>> Environment created. Activate it with:\nconda activate $(PROJECT_NAME)"

## Show how to activate the conda environment
.PHONY: activate
activate:
	@echo "Run the following to activate the environment:"
	@echo "conda activate $(PROJECT_NAME)"

## Install Python dependencies using Poetry
.PHONY: install
install:
	poetry install

#################################################################################
# CODE QUALITY                                                                  #
#################################################################################

## Run linters (ruff, isort, black check)
.PHONY: lint
lint:
	ruff check .
	isort --check --diff .
	black --check .

## Format code (black + isort)
.PHONY: format
format:
	isort .
	black .

#################################################################################
# CLEANUP                                                                       #
#################################################################################

## Delete all compiled Python files
.PHONY: clean
clean:
	find . -type f -name "*.py[co]" -delete
	find . -type d -name "__pycache__" -delete

#################################################################################
# SELF-DOCUMENTING MAKEFILE                                                     #
#################################################################################

.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys; \
lines = '\n'.join([line for line in sys.stdin]); \
matches = re.findall(r'\n## (.*)\n[\s\S]+?\n([a-zA-Z_-]+):', lines); \
print('Available rules:\n'); \
print('\n'.join(['{:25}{}'.format(*reversed(match)) for match in matches]))
endef
export PRINT_HELP_PYSCRIPT

## Show help
.PHONY: help
help:
	@$(PYTHON_INTERPRETER) -c "${PRINT_HELP_PYSCRIPT}" < $(MAKEFILE_LIST)

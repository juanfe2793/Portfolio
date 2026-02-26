# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install uv
RUN pip install uv

# Copy the project configuration files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen

# Copy the current directory contents into the container at /app
COPY . /app

# Expose port 8000 for the MkDocs development server
EXPOSE 8000

# Command to serve the site
# Using 0.0.0.0 to allow access from outside the container
CMD ["uv", "run", "mkdocs", "serve", "--dev-addr", "0.0.0.0:8000"]

# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
# We install mkdocs-material and the exclude plugin directly
RUN pip install --no-cache-dir \
    mkdocs-material \
    mkdocs-exclude

# Copy the current directory contents into the container at /app
COPY . /app

# Expose port 8000 for the MkDocs development server
EXPOSE 8000

# Command to serve the site
# Using 0.0.0.0 to allow access from outside the container
CMD ["mkdocs", "serve", "--dev-addr", "0.0.0.0:8000"]

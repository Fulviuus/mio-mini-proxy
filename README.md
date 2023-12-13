# Mio Mini Proxy: Deno HTTPS Reverse Proxy Server

This project includes a Deno server acting as a reverse proxy. It forwards requests received over HTTPS to a specified HTTP target server.

## Getting Started

### Prerequisites

- Deno runtime
- SSL certificate and key for HTTPS (instructions below)

### Running the Server

To run the server, use the following command:

```bash
deno run --allow-all proxy.ts [TARGET_URL]
```

Replace `[TARGET_URL]` with the URL of your target HTTP server. For example:

```bash
deno run --allow-all proxy.ts http://localhost:8000
```

### Generating SSL Certificates

#### macOS

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

#### Ubuntu

```bash
sudo apt-get install openssl
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

This command generates a new SSL certificate (`cert.pem`) and key (`key.pem`) valid for 365 days.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
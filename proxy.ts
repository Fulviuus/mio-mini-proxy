import { serveTls } from "https://deno.land/std/http/server.ts";

const PROXY_PORT = 8443; // Port for your HTTPS proxy server
const TARGET_URL = Deno.args[0] || "http://localhost:8000"; // Target HTTP server URL from command line
const CERT_FILE = "./cert.pem"; // Path to your SSL certificate
const KEY_FILE = "./key.pem"; // Path to your SSL key

async function handleRequest(request: Request): Promise<Response> {
    try {
        const originalUrl = new URL(request.url);
        const targetUrl = new URL(TARGET_URL);

        // Preserve the path and query from the original request
        targetUrl.pathname = originalUrl.pathname;
        targetUrl.search = originalUrl.search;

        // Create a new request for the target server
        const newRequest = new Request(targetUrl.toString(), {
            method: request.method,
            headers: new Headers(request.headers), // Clone the headers
            body: request.bodyUsed ? request.body : undefined,
        });

        // Forward the request to the target server
        const response = await fetch(newRequest);

        // Return the response from the target server
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    } catch (error) {
        console.error('Error in proxy server:', error);
        return new Response("Internal server error", { status: 500 });
    }
}

console.log(`HTTPS Proxy server is running on https://localhost:${PROXY_PORT}/`);
await serveTls(handleRequest, {
    port: PROXY_PORT,
    certFile: CERT_FILE,
    keyFile: KEY_FILE,
});

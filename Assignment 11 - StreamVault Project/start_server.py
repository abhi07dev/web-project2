import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server started at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server.")
        
        # Open Firefox if available, else default browser
        try:
            # Look for firefox specifically as requested
            firefox = webbrowser.get('firefox')
            firefox.open(f"http://localhost:{PORT}/index.html")
        except webbrowser.Error:
            webbrowser.open(f"http://localhost:{PORT}/index.html")
            
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()

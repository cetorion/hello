package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
)

//go:embed dist
var dist embed.FS

func main() {
	var port string
	flag.StringVar(&port, "port", "8080", "port number")
	flag.Parse()

	efs, err := fs.Sub(dist, "dist")
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()

	wrap := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/" {
				_, err := efs.Open(r.URL.Path[1:])
				if err != nil {
					r.URL.Path = "/"
				}
			}
			h.ServeHTTP(w, r)
		})
	}

	mux.Handle("GET /", wrap(http.FileServer(http.FS(efs))))
	mux.HandleFunc("GET /hello", Hello)

	log.Printf("Listening on :%s...\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), mux))
}

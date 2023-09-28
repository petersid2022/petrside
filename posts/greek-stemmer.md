---
title: 'Greek Stemmer library written in Go'
date: '2023-09-28'
---

# What's that ?
Based on the Georgios Ntais' Paper [Development of a Stemmer for the Greek Language](https://people.dsv.su.se/~hercules/papers/Ntais_greek_stemmer_thesis_final.pdf), I developed an opensource implementation of a Greek stemmer library written in Go. Inspiration for this project came from this GitHub repo: [skroutz/greek_stemmer](https://github.com/skroutz/greek_stemmer/). \
The Greek stemmer is developed as a computational linguistics tool that applies a set of rules and algorithms to transform inflected Greek words into their base or root form. \
This process, known as stemming, allows for improved analysis and comparison of Greek texts by reducing words to their essential forms. \
Possible application include Natural language processing tasks (text analysis, information retrieval, and machine translation), Search Engine optimizations (e.g. a search for "running" could also return results for "run.") etc. 

---

# Example usage:
```go
package main 

import (
    "fmt"
    "github.com/petersid2022/greek_stemmer"
)

func main(){
    x := greek_stemmer.GreekStemmer("ΑΠΑΓΩΓΗ")
    fmt.Println(x)
}
```
> [GitHub repo](https://github.com/petersid2022/greek_stemmer)

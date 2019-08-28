## JWE

#### Generate JWK

```
const authService =  new AuthService();

authService.generateKeys();

// Genera el JWK para las llaves públicas y privadas
```


#### Encript data

```
const payload = { test: 'algo' };

authService.encrypt(payload);

// Encripta un payload
```

#### Decrypt data

```
const encPayload = eyJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiMTU2NzAyMDMzNSIsImFsZyI6IlJTQS1PQUVQLTI1NiJ9.MkWHkx7FWQf4lEhcYIbyMdlJQlgMz4LIN2F1nUXwiyI6ohRzhaDRjqb7oFrWp15Q3TWvvtciI47Wl6p_EWdRuNpIGaLT4adchkWmz4-ExMmSfU0OmuvKjXVgNbr4l8ppLTGQp9XpLmL8eGzd2Hjes6-JjpP43oTvybqZP2CydKdOerLJAQ9t_bS2hVefjhaptbYkGHBf3Qy-LqTfJ3NPOHTakPxFXOdZQw2rdsrz0BqKGKeoUTDGkTCQCMcH8z5HHksHuErwJmtZRXy1HlX0Lr8GlQ0t5A8Tnlgo_wBx0ayXgwUf1S20VW8sDIBca9pla1LRXpqa69BxJlpq1OFjQQ.-3Bgs7aNCD6loDFgpYZc4g.wraFtUsalWvsAjeMeIw61P4IryHKgFGlzZmnWVedj6CMPpPrP5L-MC5ch06vvUvWHDrpq0IQepgO7TQwbMDRWg.gURdKuw4HJameFOpyP9ush66cWc4GoS0zVD8dasrR6Y

authService.decrypt(encPayload);

// Desencripta data encriptada
```

Genera las llaves públicas y privadas


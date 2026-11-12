INSTALLAZIONE SU REGISTER.IT
1. Carica TUTTO (inclusa la cartella assets e contact.php) in httpdocs / cartella pubblica via FTP o File Manager.
2. contact.php richiede PHP attivo sul piano (di norma lo e'). In contact.php verifica $FROM: deve essere una casella o alias ESISTENTE sul dominio, altrimenti Register puo' scartare la mail.
3. Manda una richiesta di prova dal modulo e controlla anche la cartella spam.
4. Se non arriva nulla, in alternativa usa SMTP (PHPMailer) con le credenziali della casella.
5. Prima di pubblicare completa in privacy.html ragione sociale e P.IVA (punto 1) e conferma i tempi di conservazione (punto 5).

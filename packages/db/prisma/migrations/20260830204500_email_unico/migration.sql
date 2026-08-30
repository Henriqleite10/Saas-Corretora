-- E-mail globalmente único: login é feito só por e-mail (sem suporte a um mesmo
-- usuário em duas corretoras no MVP).
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

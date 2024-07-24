# Utiliza a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instala dependências e extensões necessárias do PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql zip

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define variável de ambiente para permitir plugins do Composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos da aplicação
COPY . .

# Remove o diretório vendor para evitar problemas com arquivos modificados
RUN rm -rf vendor

# Instala as dependências do Composer
RUN composer install --no-dev --optimize-autoloader

# Copia o arquivo de configuração do Apache
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# Habilita o mod_rewrite do Apache
RUN a2enmod rewrite

# Permissões da pasta de storage e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor Apache
CMD ["apache2-foreground"]
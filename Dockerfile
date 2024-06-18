FROM php:8.3-apache

RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN apt-get update -y && apt-get install -y git zip unzip libpng-dev libjpeg-dev
RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ && docker-php-ext-install gd
RUN docker-php-ext-install pdo pdo_mysql exif
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN pecl install xdebug-3.3.1
RUN docker-php-ext-enable xdebug

COPY ./docker/phpconfig/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
COPY ./docker/phpconfig/php.ini /usr/local/etc/php/conf.d/php.ini
# Om de omgeving te simuleren van de live server, moeten we vendor naast api zetten, dus werken we in de html folder
WORKDIR /var/www/html

COPY ./composer.json /var/www/html/composer.json
RUN cd /var/www/html && composer install

# Create collages folder
RUN mkdir -p /var/www/html/assets/media/collages
RUN chown -R www-data:www-data /var/www/html

# Copy the rest of the application
COPY ./api /var/www/html/api
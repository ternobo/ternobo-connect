@servers(['production' => ['ternobo@ternobo.info']])

@task('deploy', ['on' => 'production'])
cd /home/ternobo/public_html/
git pull
composer install --no-interaction --prefer-dist
composer update --no-interaction
composer dump-autoload
php artisan backup:run
php artisan migrate --force
npm run production
@endtask

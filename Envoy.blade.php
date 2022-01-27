@servers(['production' => ['ternobo@ternobo.info']])

@task('deploy', ['on' => 'production'])
export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

cd /home/ternobo/public_html/
php artisan backup:run
git pull
composer install --no-interaction --prefer-dist
composer update --no-interaction
composer dump-autoload
php artisan migrate --force
npm install
npm run production
@endtask

@task('deploy-ui-only', ['on' => 'production'])
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

cd /home/ternobo/public_html/
npm install
npm run production
@endtask
